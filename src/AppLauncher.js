import React, { useEffect, useRef } from "react";
import { YuzuApp } from "./AppLauncher.module.scss";
import { FlexColumnReverse } from "scss/flex.module.scss";
import classnames from "classnames";
import { BottomToolbar, MessageListener } from "components";
import { connect } from "react-redux";
import { Input } from "antd";
import {
  getCommentBoxStatus,
  getOverlayStatus,
  toggleCommentBox,
  toggleCommentMode
} from "store-launcher";
import { ToastContainer } from "react-toastify";

const AppLauncher = props => {
  const yuzuApp = useRef(null);
  const { commentBoxIsOpen } = props;

  useEffect(() => {
    const height = yuzuApp.current.clientHeight;
    const width = yuzuApp.current.clientWidth;
    window.parent.postMessage({ type: "resizeLauncher", width, height }, "*");
  }, []);

  return (
    <div className={classnames(YuzuApp, FlexColumnReverse)} ref={yuzuApp}>
      <div>{commentBoxIsOpen ? <Input value="test" /> : ""}</div>
      <BottomToolbar {...props} />
      <MessageListener />
      <ToastContainer autoClose={3000} />
    </div>
  );
};

const mapState = (state, ownProps) => {
  return {
    ...ownProps,
    overlayActivated: getOverlayStatus(state),
    commentBoxIsOpen: getCommentBoxStatus(state)
  };
};

const actions = { toggleCommentBox, toggleCommentMode };

export default connect(
  mapState,
  actions
)(AppLauncher);
