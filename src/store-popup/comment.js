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
  byIds: {},
  isFetching: false,
  hasMore: true,
  offset: 0,
  limit: 5
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
    const commentIds = Object.keys(comments);
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
        byIds: {
          ...state.byIds,
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
        byIds: {
          ...state.byIds,
          [action.comment.id]: action.comment
        },
        ids: [action.comment.id].concat(state.ids)
      };
    default:
      return state;
  }
}

export const getComments = state =>
  state.comment.ids.map(cid => state.comment.byIds[cid]);
