import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  getCommentBoxStatus,
  toggleCommentBox,
  initEnvironment
} from "store-popup";
import { PopupMessageListener } from "components";

const AppPopup = props => {
  const { commentBoxIsOpen, initEnvironment } = props;

  useEffect(function() {
    initEnvironment();
  }, []);

  return (
    <div className="">
      hello
      <PopupMessageListener appName="popup" />
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

const actions = { toggleCommentBox, initEnvironment };

export default connect(
  mapState,
  actions
)(AppPopup);
