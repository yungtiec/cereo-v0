/**
 * ACTION TYPES
 */
const TOGGLE_OVERLAY = "TOGGLE_OVERLAY";
const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";

/**
 * INITIAL STATE
 */
const initialState = {
  overlay: false,
  sidebar: false
};

/**
 * ACTION CREATORS
 */
export const toggleOverlay = user => ({ type: TOGGLE_OVERLAY });
export const toggleSidebar = () => ({ type: TOGGLE_SIDEBAR });

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
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebar: !state.sidebar
      };
    default:
      return state;
  }
}

/**
 * SELECTOR
 */
export const getOverlayStatus = state => state.ui.overlay;

export const getSidebarStatus = state => state.ui.sidebar;
