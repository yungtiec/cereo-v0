/**
 * ACTION TYPES
 */
const TOGGLE_OVERLAY = "TOGGLE_OVERLAY";
const UPDATE_COMMENT_BOX_STATUS = "UPDATE_COMMENT_BOX_STATUS";

/**
 * INITIAL STATE
 */
const initialState = {
  overlay: false,
  commentBox: false
};

/**
 * ACTION CREATORS
 */
export const toggleOverlay = () => ({ type: TOGGLE_OVERLAY });

export const updateCommentBox = commentBox => ({
  type: UPDATE_COMMENT_BOX_STATUS,
  commentBox
});

/**
 * THUNK CREATOR
 */
export const toggleCommentMode = () => (dispatch, getState) => {
  const currentStatus = getState().ui.overlay;
  window.parent.postMessage(
    { type: "UPDATE_OVERLAY", status: !currentStatus },
    "*"
  );
  dispatch({ type: TOGGLE_OVERLAY });
};

export const toggleCommentBox = () => (dispatch, getState) => {
  const newStatus = !getState().ui.commentBox;
  window.parent.postMessage(
    { type: "UPDATE_COMMENT_BOX_STATUS", commentBox: newStatus },
    "*"
  );
  window.parent.frames[1].postMessage(
    { type: "UPDATE_COMMENT_BOX_STATUS", commentBox: newStatus },
    "*"
  );
  dispatch(updateCommentBox(newStatus));
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_OVERLAY:
      return {
        ...state,
        overlay: !state.overlay
      };
    case UPDATE_COMMENT_BOX_STATUS:
      return {
        ...state,
        commentBox: action.commentBox
      };
    default:
      return state;
  }
}

/**
 * SELECTOR
 */
export const getOverlayStatus = state => state.ui.overlay;

export const getCommentBoxStatus = state => state.ui.commentBox;
