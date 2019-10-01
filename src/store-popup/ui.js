/**
 * ACTION TYPES
 */
const TOGGLE_COMMENT_BOX = "TOGGLE_COMMENT_BOX";

/**
 * INITIAL STATE
 */
const initialState = {
  commentBox: false
};

/**
 * ACTION CREATORS
 */
export const toggleCommentBox = () => ({ type: TOGGLE_COMMENT_BOX });

/**
 * THUNK CREATOR
 */
export const toggleCommentMode = () => (dispatch, getState) => {
  const currentStatus = getState().ui.commentBox;
  window.parent.postMessage(
    { type: "updateCommentBox", status: !currentStatus },
    "*"
  );
  dispatch({ type: TOGGLE_COMMENT_BOX });
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_COMMENT_BOX:
      return {
        ...state,
        commentBox: !state.commentBox
      };
    default:
      return state;
  }
}

/**
 * SELECTOR
 */
export const getCommentBoxStatus = state => state.ui.commentBox;
