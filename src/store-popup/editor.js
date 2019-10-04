/**
 * ACTION TYPES
 */
const RESET_EDITOR = "RESET_EDITOR";
const UPDATE_PAGE_INFO = "UPDATE_PAGE_INFO";
const SET_EDITOR_VALUE = "SET_EDITOR_VALUE";

/**
 * INITIAL STATE
 */
const initialState = {
  pageInfo: {},
  value: ""
};

/**
 * ACTION CREATORS
 */

export const updatePageInfo = pageInfo => ({
  type: UPDATE_PAGE_INFO,
  pageInfo
});

export const resetEditorData = () => ({
  type: RESET_EDITOR
});

export const setEditorValue = value => ({
  type: SET_EDITOR_VALUE,
  value
});

/**
 * THUNK CREATOR
 */

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PAGE_INFO:
      return {
        ...state,
        pageInfo: {
          ...state.pageInfo,
          ...action.pageInfo
        }
      };
    case SET_EDITOR_VALUE:
      return {
        ...state,
        value: action.value
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

export const getPageInfo = state => state.editor.pageInfo;

export const getEditorValue = state => state.editor.value;
