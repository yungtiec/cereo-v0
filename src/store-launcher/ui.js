/**
 * ACTION TYPES
 */
const TOGGLE_OVERLAY = "TOGGLE_OVERLAY";
const UPDATE_POPUP_STATUS = "UPDATE_POPUP_STATUS";

/**
 * INITIAL STATE
 */
const initialState = {
  overlay: true,
  popup: false
};

/**
 * ACTION CREATORS
 */
export const toggleOverlay = () => ({ type: TOGGLE_OVERLAY });

export const updatePopup = popup => ({
  type: UPDATE_POPUP_STATUS,
  popup
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

export const togglePopup = () => (dispatch, getState) => {
  const newStatus = !getState().ui.popup;
  window.parent.postMessage(
    { type: "UPDATE_POPUP_STATUS", popup: newStatus },
    "*"
  );
  window.parent.frames[1].postMessage(
    { type: "UPDATE_POPUP_STATUS", popup: newStatus },
    "*"
  );
  dispatch(updatePopup(newStatus));
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
    case UPDATE_POPUP_STATUS:
      return {
        ...state,
        popup: action.popup
      };
    default:
      return state;
  }
}

/**
 * SELECTOR
 */
export const getOverlayStatus = state => state.ui.overlay;

export const getPopupStatus = state => state.ui.popup;
