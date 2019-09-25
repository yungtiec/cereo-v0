import axios from "axios";
import { toast } from "react-toastify";

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
