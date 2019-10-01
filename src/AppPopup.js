import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { getCommentBoxStatus, toggleCommentBox } from "store-popup";

const AppPopup = props => {
  const yuzuApp = useRef(null);
  const { commentBoxIsOpen } = props;

  useEffect(() => {
    const height = yuzuApp.current.clientHeight;
    const width = yuzuApp.current.clientWidth;
    window.parent.postMessage({ type: "resizeLauncher", width, height }, "*");
  }, []);

  return (
    <div className="" ref={yuzuApp}>
      hello
      <ToastContainer autoClose={3000} />
    </div>
  );
};

const mapState = (state, ownProps) => {
  return {
    ...ownProps,
    commentBoxIsOpen: getCommentBoxStatus(state)
  };
};

const actions = { toggleCommentBox };

export default connect(
  mapState,
  actions
)(AppPopup);
