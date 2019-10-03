import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { initEnvironment, fetchComments } from "store-popup";
import { PopupMessageListener, CommentBox, BasicEditor } from "components";

const AppPopup = props => {
  const { initEnvironment } = props;

  useEffect(function() {
    initEnvironment();
    fetchComments();
  }, []);

  return (
    <Fragment>
      <BasicEditor />
      <CommentBox {...props} />
      <PopupMessageListener appName="popup" />
      <ToastContainer autoClose={3000} />
    </Fragment>
  );
};

const mapState = (state, ownProps) => {
  return {
    ...ownProps
  };
};

const actions = { initEnvironment, fetchComments };

export default connect(
  mapState,
  actions
)(AppPopup);
