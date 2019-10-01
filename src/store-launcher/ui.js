/**
 * ACTION TYPES
 */
const TOGGLE_OVERLAY = "TOGGLE_OVERLAY";
const TOGGLE_COMMENT_BOX = "TOGGLE_COMMENT_BOX";

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
export const toggleOverlay = user => ({ type: TOGGLE_OVERLAY });
export const toggleCommentBox = () => ({ type: TOGGLE_COMMENT_BOX });

/**
 * THUNK CREATOR
 */
export const toggleCommentMode = () => (dispatch, getState) => {
  const currentStatus = getState().ui.overlay;
  window.parent.postMessage(
    { type: "updateOverlay", status: !currentStatus },
    "*"
  );
  dispatch({ type: TOGGLE_OVERLAY });
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
export const getOverlayStatus = state => state.ui.overlay;

export const getCommentBoxStatus = state => state.ui.commentBox;
