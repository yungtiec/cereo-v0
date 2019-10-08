import axios from "axios";

/**
 * ACTION TYPES
 */
export const COMMENT_ADDED = "COMMENT_ADDED";
export const COMMENTS_FETCH_SUCCESS = "COMMENTS_FETCH_SUCCESS";
export const COMMENTS_REQUESTED = "COMMENTS_REQUESTED";
export const COMMENT_UPDATED = "COMMENT_UPDATED";
export const COMMENT_DELETED = "COMMENT_DELETED";
export const COMMENT_REPLIED = "COMMENT_REPLIED";

/**
 * INITIAL STATE
 */
const initialState = {
  ids: [],
  byId: {},
  isFetching: false,
  hasMore: true,
  offset: 0,
  limit: 3,
  ownersById: {},
  guestOwnersById: {}
};

export const requestComments = () => ({ type: COMMENTS_REQUESTED });

/**
 * THUNK CREATORS
 */

export const postComment = c => async dispatch => {
  try {
    const postedComment = await axios
      .post("/api/comments", c)
      .then(res => res.data);
    const { guestOwner, owner, ...comment } = postedComment;
    dispatch({
      type: COMMENT_ADDED,
      comment,
      guestOwner,
      owner
    });
    window.parent.postMessage(
      { type: "COMMENT_ADDED", commentId: postedComment.id },
      "*"
    );
  } catch (err) {
    console.log(err);
  }
};

export const putComment = ({ commentId, data }) => async dispatch => {
  try {
    const putComment = await axios
      .put(`/api/comments/${commentId}`, data)
      .then(res => res.data);
    const { guestOwner, owner, ...comment } = putComment;
    dispatch({
      type: COMMENT_UPDATED,
      comment,
      commentId,
      guestOwner,
      owner
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteComment = ({ commentId, rootId }) => async dispatch => {
  try {
    await axios.delete(`/api/comments/${commentId}`);
    dispatch({
      type: COMMENT_DELETED,
      rootId,
      commentId
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchComments = () => async (dispatch, getState) => {
  try {
    const state = getState();
    if (!state.comment.hasMore) return;
    dispatch(requestComments());
    const rawComments = await axios
      .get("/api/comments", {
        params: {
          offset: state.comment.offset,
          limit: state.comment.limit
        }
      })
      .then(res => res.data);
    const { comments, owners, guestOwners } = rawComments.reduce(
      ({ comments, owners, guestOwners }, c) => {
        const { guestOwner, owner, descendents, ...comment } = c;
        var { replies, replyOwners, replyGuestOwners } = descendents.reduce(
          ({ replies, replyOwners, replyGuestOwners }, d) => {
            const { guestOwner, owner, ...reply } = d;
            return {
              replies: replies.concat(reply),
              replyOwners: replyOwners.concat(owner),
              replyGuestOwners: replyGuestOwners.concat(guestOwner)
            };
          },
          { replies: [], replyOwners: [], replyGuestOwners: [] }
        );
        return {
          comments: comments
            .concat({
              ...comment,
              descendents: replies.map(r => r.id)
            })
            .concat(replies),
          owners: owners.concat(owner || []).concat(replyOwners),
          guestOwners: guestOwners
            .concat(guestOwner || [])
            .concat(replyGuestOwners)
        };
      },
      { comments: [], owners: [], guestOwners: [] }
    );
    const commentIds = rawComments.map(c => c.id);
    const commentsById = comments.reduce(
      (obj, comment) => Object.assign(obj, { [comment.id]: comment }),
      {}
    );
    const ownersById = owners
      .filter(o => o)
      .reduce((obj, owner) => Object.assign(obj, { [owner.id]: owner }), {});
    const guestOwnersById = guestOwners
      .filter(o => o)
      .reduce(
        (obj, guestOwner) =>
          Object.assign(obj, { [guestOwner.id]: guestOwner }),
        {}
      );
    const hasMore =
      commentIds.length && commentIds.length === state.comment.limit;
    dispatch({
      type: COMMENTS_FETCH_SUCCESS,
      commentIds,
      commentsById,
      ownersById,
      guestOwnersById,
      hasMore,
      offset: hasMore
        ? state.comment.offset + state.comment.limit
        : state.comment.offset
    });
    return comments;
  } catch (err) {
    console.log(err);
  }
};

export const replyToComment = ({ rootId, text }) => {
  return async dispatch => {
    try {
      const rawReply = await axios
        .post(`/api/comments/${rootId}/reply`, {
          text
        })
        .then(res => res.data);
      const { guestOwner, owner, ...reply } = rawReply;

      dispatch({
        type: COMMENT_REPLIED,
        reply,
        guestOwner,
        owner,
        rootCommentId: rootId
      });
    } catch (err) {
      console.log(err);
    }
  };
};

/**
 * HELPERS
 */

const denormalizeComment = (state, comment) => ({
  ...comment,
  guestOwner: comment.guestId
    ? { ...state.comment.guestOwnersById[comment.guestId] }
    : null,
  owner: comment.ownerId
    ? { ...state.comment.ownersById[comment.ownerId] }
    : null
});

const updateStateOwnerInfo = ({ updatedState, state, action }) => {
  if (action.owner)
    updatedState.ownersById = {
      ...state.ownersById,
      [action.owner.id]: action.owner
    };
  if (action.guestOwner)
    updatedState.ownersById = {
      ...state.ownersById,
      [action.guestOwner.id]: action.guestOwner
    };
  return updatedState;
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case COMMENTS_REQUESTED:
      return {
        ...state,
        isFetching: true
      };
    case COMMENTS_FETCH_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          ...action.commentsById
        },
        ids: state.ids.concat(action.commentIds || []),
        isFetching: false,
        hasMore: action.hasMore,
        offset: action.offset,
        ownersById: {
          ...state.ownersById,
          ...action.ownersById
        },
        guestOwnersById: {
          ...state.guestOwnersById,
          ...action.guestOwnersById
        }
      };
    case COMMENT_ADDED:
      var updatedState = {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.id]: action.comment
        },
        ids: [action.comment.id].concat(state.ids)
      };
      return updateStateOwnerInfo({ updatedState, state, action });
    case COMMENT_UPDATED:
      var updatedState = {
        ...state,
        byId: {
          ...state.byId,
          [action.commentId]: {
            ...state.byId[action.commentId],
            ...action.comment
          }
        }
      };
      return updateStateOwnerInfo({ updatedState, state, action });
    case COMMENT_REPLIED:
      var updatedState = {
        ...state,
        byId: {
          ...state.byId,
          [action.reply.id]: action.reply,
          [action.rootCommentId]: {
            ...state.byId[action.rootCommentId],
            descendents: state.byId[action.rootCommentId].descendents.concat(
              action.reply.id
            )
          }
        }
      };
      return updateStateOwnerInfo({ updatedState, state, action });
    case COMMENT_DELETED:
      if (!action.rootId)
        return {
          ...state,
          byId: {
            ...state.byId,
            [action.commentId]: { text: "[deleted]" }
          },
          ids: state.ids.filter(id => id !== action.commentId)
        };
      else
        return {
          ...state,
          byId: {
            ...state.byId,
            [action.rootId]: {
              ...state.byId[action.rootId],
              descendents: state.byId[action.rootId].descendents.filter(
                did => did !== action.commentId
              )
            }
          }
        };
    default:
      return state;
  }
}

export const isFetchingComments = state => state.comment.isFetching;

export const getComments = state =>
  state.comment.ids.map(cid => {
    var comment = denormalizeComment(state, state.comment.byId[cid]);
    return {
      ...comment,
      descendents: comment.descendents.map(did =>
        denormalizeComment(state, state.comment.byId[did])
      )
    };
  });

export const hasMoreComments = state => state.comment.hasMore;

export const getCurrentCommentItem = state => {
  if (!state.ui.commentItem) return;
  var comment = denormalizeComment(
    state,
    state.comment.byId[state.ui.commentItem]
  );
  return {
    ...comment,
    descendents: comment.descendents.map(did =>
      denormalizeComment(state, state.comment.byId[did])
    )
  };
};
