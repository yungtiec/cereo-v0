/**
 * ACTION TYPES
 */
const UPDATE_EDITOR_STATUS = "UPDATE_EDITOR_STATUS";
const RESET_EDITOR = "RESET_EDITOR";

/**
 * INITIAL STATE
 */
const initialState = {
  status: false,
  pageInfo: {}
};

/**
 * ACTION CREATORS
 */
export const updateEditorStatus = (editorStatus, pageInfo) => ({
  type: UPDATE_EDITOR_STATUS,
  editorStatus,
  pageInfo
});

export const resetEditor = () => ({
  type: RESET_EDITOR
});

/**
 * THUNK CREATOR
 */

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_EDITOR_STATUS:
      return {
        ...state,
        status: action.editorStatus,
        pageInfo: {
          ...state.pageInfo,
          ...action.pageInfo
        }
      };
    case RESET_EDITOR:
      return initialState;
    default:
      return state;
  }
}

/**
 * SELECTOR
 */
export const getEditorStatus = state => state.editor.status;
