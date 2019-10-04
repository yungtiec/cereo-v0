/**
 * ACTION TYPES
 */
const UPDATE_GREETING_OVERLAY_STATUS = "UPDATE_GREETING_OVERLAY_STATUS";
const UPDATE_POPUP_STATUS = "UPDATE_POPUP_STATUS";
const UPDATE_EDITOR_STATUS = "UPDATE_EDITOR_STATUS";
const UPDATE_COMMENT_LIST_STATUS = "UPDATE_COMMENT_LIST_STATUS";
const UPDATE_COMMENT_ITEM_STATUS = "UPDATE_COMMENT_ITEM_STATUS";

/**
 * INITIAL STATE
 */
const initialState = {
  greetingOverlay: false, // false, guest, login, onboard
  popup: false,
  editor: false,
  commentItem: null,
  commentList: true
};

/**
 * ACTION CREATORS
 */
export const togglePopup = () => ({ type: UPDATE_POPUP_STATUS });

export const updatePopup = popup => ({
  type: UPDATE_POPUP_STATUS,
  popup
});

export const updateEditorStatus = editor => ({
  type: UPDATE_EDITOR_STATUS,
  editor
});

export const updateCommentListStatus = commentList => ({
  type: UPDATE_COMMENT_LIST_STATUS,
  commentList
});

export const updateCommentItemStatus = commentItem => ({
  type: UPDATE_COMMENT_ITEM_STATUS,
  commentItem
});

export const updateGreetingOverlayStatus = greetingOverlay => ({
  type: UPDATE_GREETING_OVERLAY_STATUS,
  greetingOverlay
});

/**
 * THUNK CREATOR
 */
export const closePopup = () => dispatch => {
  window.parent.frames[0].postMessage(
    { type: "UPDATE_POPUP_STATUS", popup: false },
    "*"
  );
  dispatch({ type: UPDATE_POPUP_STATUS, popup: false });
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_POPUP_STATUS:
      return {
        ...state,
        popup: action.popup
      };
    case UPDATE_EDITOR_STATUS:
      return {
        ...state,
        editor: action.editor
      };
    case UPDATE_COMMENT_LIST_STATUS:
      return {
        ...state,
        commentList: action.commentList
      };
    case UPDATE_COMMENT_ITEM_STATUS:
      return {
        ...state,
        commentItem: action.commentItem
      };
    case UPDATE_GREETING_OVERLAY_STATUS:
      return {
        ...state,
        greetingOverlay: action.greetingOverlay
      };
    default:
      return state;
  }
}

/**
 * SELECTOR
 */
export const getPopupStatus = state => state.ui.popup;

export const getEditorStatus = state => state.ui.editor;

export const getCommentListStatus = state =>
  !state.ui.editor && !state.ui.commentItem && state.ui.commentList;

export const getCommentItemStatus = state =>
  !state.ui.editor && !!state.ui.commentItem;

export const getGreetingOverlayStatus = state => !!state.ui.greetingOverlay;

export const isOnboardMessage = state =>
  !!state.ui.greetingOverlay && state.ui.greetingOverlay === "onboard";

export const isGuestForm = state =>
  !!state.ui.greetingOverlay && state.ui.greetingOverlay === "guest";

export const isLoginForm = state =>
  !!state.ui.greetingOverlay && state.ui.greetingOverlay === "login";
