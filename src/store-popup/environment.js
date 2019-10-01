import { deviceDetector } from "../utils";

/**
 * ACTION TYPES
 */
export const CHANGE_WIDTH_AND_HEIGHT = "environment.CHANGE_WIDTH_AND_HEIGHT";
export const CHANGE_IS_MOBILE = "environment.CHANGE_IS_MOBILE";
export const GET_DEVICE_INFO = "environment.GET_DEVICE_INFO";

/**
 * INITIAL STATE
 */
const initialState = {
  isMobile: false,
  height: null,
  width: null,
  deviceInfo: {}
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
    dispatch(getDeviceInfo());

    window.onresize = () => {
      dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));
    };
  };
}

export function getDeviceInfo() {
  return dispatch => {
    const { os, browser } = deviceDetector.init();
    const deviceInfo = {
      os: `${os.name} ${os.version}`,
      browser: `${browser.name} ${browser.version}`,
      userAgent: window.navigator.userAgent,
      appVersion: window.navigator.appVersion,
      platform: window.navigator.platform,
      vendor: window.navigator.vendor
    };
    dispatch({ type: GET_DEVICE_INFO, deviceInfo });
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

    case GET_DEVICE_INFO:
      return {
        ...state,
        deviceInfo: action.deviceInfo
      };
    default:
      return state;
  }
}
