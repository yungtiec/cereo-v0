import axios from "axios";

/**
 * ACTION TYPES
 */
export const COMMENT_ADDED = "COMMENT_ADDED";
export const COMMENTS_FETCH_SUCCESS = "COMMENTS_FETCH_SUCCESS";
export const COMMENTS_REQUESTED = "COMMENTS_REQUESTED";
export const COMMENT_UPDATED = "COMMENT_UPDATED";
export const COMMENT_DELETED = "COMMENT_DELETED";
/**
 * INITIAL STATE
 */
const initialState = {
  ids: [],
  byId: {},
  isFetching: false,
  hasMore: true,
  offset: 0,
  limit: 3
};

export const requestComments = () => ({ type: COMMENTS_REQUESTED });

/**
 * THUNK CREATORS
 */

export const postComment = comment => async dispatch => {
  try {
    const postedComment = await axios
      .post("/api/comments", comment)
      .then(res => res.data);
    dispatch({
      type: COMMENT_ADDED,
      comment: postedComment
    });
    window.parent.postMessage(
      { type: "COMMENT_ADDED", commentId: postedComment.id },
      "*"
    );
  } catch (err) {
    console.log(err);
  }
};

export const fetchComments = () => async (dispatch, getState) => {
  try {
    dispatch(requestComments());
    const state = getState();
    const comments = await axios
      .get("/api/comments", {
        params: {
          offset: state.comment.offset,
          limit: state.comment.limit
        }
      })
      .then(res => res.data);
    const commentIds = comments.map(c => c.id);
    const commentsById = comments.reduce(
      (obj, comment) => Object.assign(obj, { [comment.id]: comment }),
      {}
    );
    const hasMore =
      commentIds.length && commentIds.length === state.comment.limit;
    dispatch({
      type: COMMENTS_FETCH_SUCCESS,
      commentIds,
      commentsById,
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
        offset: action.offset
      };
    case COMMENT_ADDED:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.id]: action.comment
        },
        ids: [action.comment.id].concat(state.ids)
      };
    default:
      return state;
  }
}

export const isFetchingComments = state => state.comment.isFetching;

export const getComments = state =>
  state.comment.ids.map(cid => state.comment.byId[cid]);

export const hasMoreComments = state => state.comment.hasMore;

export const getCurrentCommentItem = state =>
  state.ui.commentItem && state.comment.byId[state.ui.commentItem];
