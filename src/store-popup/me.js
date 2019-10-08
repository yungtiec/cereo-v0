import axios from "axios";
import { updateGreetingOverlayStatus } from "store-popup";

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";
const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";

/**
 * INITIAL STATE
 */
const initialState = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const user = await axios.get("/auth/me").then(res => res.data);
    const hasUserRecord = Object.keys(user).length;
    const isUser = hasUserRecord && !user.isGuest;
    const isGuest = hasUserRecord && user.isGuest;
    dispatch(getUser(user || initialState));
    window.parent.postMessage(
      { type: "UPDATE_POPUP_STATUS", popup: true },
      "*"
    );
    if (isUser || isGuest)
      window.parent.postMessage({ type: "SHOW_LAUNCHER" }, "*");
    if (isUser && user.onboard) {
      window.parent.postMessage({ type: "SET_POPUP_TO_WIDGET_SIZE" }, "*");
      window.parent.postMessage(
        { type: "UPDATE_POPUP_STATUS", popup: false },
        "*"
      );
      return;
    }
    window.parent.postMessage({ type: "SET_POPUP_TO_FULL_SCREEN" }, "*");
    if (!hasUserRecord) {
      return dispatch(updateGreetingOverlayStatus("guest"));
    }
    dispatch(updateGreetingOverlayStatus("onboard"));
  } catch (err) {
    console.error(err);
  }
};

export const registerAsGuest = ({ name, email }) => async dispatch => {
  try {
    await axios.post("/auth/guest", { name, email });
    dispatch(getUser({ name, email, isGuest: true }));
    window.parent.postMessage({ type: "SHOW_LAUNCHER" }, "*");
    window.parent.postMessage({ type: "SET_POPUP_TO_WIDGET_SIZE" }, "*");
    window.parent.postMessage(
      { type: "UPDATE_POPUP_STATUS", popup: false },
      "*"
    );
    dispatch(updateGreetingOverlayStatus(false));
  } catch (err) {
    console.log(err);
  }
};

export const onboarded = () => async (dispatch, getState) => {
  try {
    const me = getState().me;
    if (!me.isGuest && !me.onboard) await axios.put("/auth/onboard");
    dispatch(updateGreetingOverlayStatus(false));
  } catch (err) {
    console.log(err);
  }
};

export const auth = ({ email, password, method }) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, { email, password });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }
  try {
    const user = res.data;
    dispatch(getUser(user));
    window.parent.postMessage({ type: "SHOW_LAUNCHER" }, "*");
    if (user.onboard) {
      window.parent.postMessage({ type: "SET_POPUP_TO_WIDGET_SIZE" }, "*");
      window.parent.postMessage(
        { type: "UPDATE_POPUP_STATUS", popup: false },
        "*"
      );
      return;
    } else {
      window.parent.postMessage({ type: "SET_POPUP_TO_FULL_SCREEN" }, "*");
      dispatch(updateGreetingOverlayStatus("onboard"));
    }
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return initialState;
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        ...action.user
      };
    default:
      return state;
  }
}

export const getMe = state => state.me;
