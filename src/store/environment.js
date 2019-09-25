/**
 * ACTION TYPES
 */
export const CHANGE_WIDTH_AND_HEIGHT = "environment.CHANGE_WIDTH_AND_HEIGHT";
export const CHANGE_IS_MOBILE = "environment.CHANGE_IS_MOBILE";

/**
 * INITIAL STATE
 */
const initialState = {
  isMobile: false,
  height: null,
  width: null
};

/**
 * ACTION CREATORS
 */
const changeIsMobile = isMobile => ({
  type: CHANGE_IS_MOBILE,
  isMobile
});

const changeWidthAndHeight = (height, width) => ({
  type: CHANGE_WIDTH_AND_HEIGHT,
  height,
  width
});

/**
 * THUNK CREATORS
 */

export function initEnvironment() {
  return dispatch => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    dispatch(changeIsMobile(isMobile));
    dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));

    window.onresize = () => {
      dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));
    };
  };
}

/**
 * REDUCER
 */

export default function environment(state = initialState, action) {
  switch (action.type) {
    case CHANGE_IS_MOBILE:
      return Object.assign({}, state, {
        isMobile: action.isMobile
      });

    case CHANGE_WIDTH_AND_HEIGHT:
      return Object.assign({}, state, {
        height: action.height,
        width: action.width
      });

    default:
      return state;
  }
}
