/**
 * ACTION TYPES
 */
const UPDATE_COMMENT_BOX_STATUS = "UPDATE_COMMENT_BOX_STATUS";
const UPDATE_EDITOR_STATUS = "UPDATE_EDITOR_STATUS";

/**
 * INITIAL STATE
 */
const initialState = {
  commentBox: false,
  editor: false
};

/**
 * ACTION CREATORS
 */
export const toggleCommentBox = () => ({ type: UPDATE_COMMENT_BOX_STATUS });

export const updateCommentBox = commentBox => ({
  type: UPDATE_COMMENT_BOX_STATUS,
  commentBox
});

/**
 * THUNK CREATOR
 */
export const closeCommentBox = () => dispatch => {
  window.parent.frames[0].postMessage(
    { type: "UPDATE_COMMENT_BOX_STATUS", commentBox: false },
    "*"
  );
  dispatch({ type: UPDATE_COMMENT_BOX_STATUS, commentBox: false });
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_COMMENT_BOX_STATUS:
      return {
        ...state,
        commentBox: action.commentBox
      };
    case UPDATE_EDITOR_STATUS:
      return {
        ...state,
        editor: action.editor
      };
    default:
      return state;
  }
}

/**
 * SELECTOR
 */
export const getCommentBoxStatus = state => state.ui.commentBox;
