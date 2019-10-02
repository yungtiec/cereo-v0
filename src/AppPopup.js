import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  getCommentBoxStatus,
  getEditorStatus,
  toggleCommentBox,
  initEnvironment
} from "store-popup";
import { PopupMessageListener, CommentBox, BasicEditor } from "components";

const AppPopup = props => {
  const { commentBoxIsOpen, editorIsOpen, initEnvironment } = props;

  useEffect(function() {
    initEnvironment();
  }, []);

  console.log(editorIsOpen);

  return (
    <Fragment>
      {editorIsOpen ? <BasicEditor /> : <CommentBox {...props} />}
      <PopupMessageListener appName="popup" />
      <ToastContainer autoClose={3000} />
    </Fragment>
  );
};

const mapState = (state, ownProps) => {
  return {
    ...ownProps,
    commentBoxIsOpen: getCommentBoxStatus(state),
    editorIsOpen: getEditorStatus(state)
  };
};

const actions = { toggleCommentBox, initEnvironment };

export default connect(
  mapState,
  actions
)(AppPopup);
