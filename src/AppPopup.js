import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  initEnvironment,
  fetchComments,
  me,
  getGreetingOverlayStatus
} from "store-popup";
import {
  PopupMessageListener,
  CommentList,
  BasicEditor,
  CommentThreadWithReplyEditor,
  GuestForm,
  AuthForm,
  OnboardMessage
} from "components";
import {
  WidgetContainer,
  FullScreenContainer,
  GreetingModal
} from "./AppPopup.module.scss";

const AppPopup = props => {
  const { initEnvironment, fetchComments, me, showGreetingOverlay } = props;

  useEffect(function() {
    initEnvironment();
    fetchComments();
    me();
  }, []);

  return (
    <Fragment>
      {showGreetingOverlay ? (
        <div className={FullScreenContainer}>
          <div className={GreetingModal}>
            <GuestForm />
            <AuthForm />
            <OnboardMessage />
          </div>
        </div>
      ) : (
        <div className={WidgetContainer}>
          <BasicEditor />
          <CommentList />
          <CommentThreadWithReplyEditor />
        </div>
      )}
      <PopupMessageListener appName="popup" />
      <ToastContainer autoClose={3000} />
    </Fragment>
  );
};

const mapState = (state, ownProps) => {
  return {
    ...ownProps,
    showGreetingOverlay: getGreetingOverlayStatus(state)
  };
};

const actions = {
  initEnvironment,
  fetchComments,
  me,
  getGreetingOverlayStatus
};

export default connect(
  mapState,
  actions
)(AppPopup);
