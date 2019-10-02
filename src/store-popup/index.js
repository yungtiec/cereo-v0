import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { toast } from "react-toastify";
import environment from "./environment";
import ui from "./ui";
import editor from "./editor";

const reducer = combineReducers({
  environment,
  ui,
  editor
});

const isDev = process.env.NODE_ENV === "development";

const middleware = composeWithDevTools(
  isDev
    ? applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
    : applyMiddleware(thunkMiddleware)
);

const store = createStore(reducer, middleware);

export default store;

export * from "./environment";
export * from "./ui";
export * from "./editor";

export const handleError = (err, dispatch) => {
  if (
    err.response &&
    (err.response.status !== 404 && err.response.status !== 401)
  ) {
    toast.error("Something went wrong. Please try again later.");
  }
};
