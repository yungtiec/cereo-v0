import React from "react";
import { YuzuLauncherFullWidth } from "./AppLauncher.module.scss";
import { FlexColumnReverse } from "scss/flex.module.scss";
import classnames from "classnames";
import { BottomToolbar, LauncherMessageListener } from "components";
import { connect } from "react-redux";
import {
  getPopupStatus,
  getOverlayStatus,
  togglePopup,
  toggleCommentMode
} from "store-launcher";
import { ToastContainer } from "react-toastify";

const AppLauncher = props => {
  return (
    <div className={classnames(YuzuLauncherFullWidth, FlexColumnReverse)}>
      <BottomToolbar {...props} />
      <LauncherMessageListener />
      <ToastContainer autoClose={3000} />
    </div>
  );
};

const mapState = (state, ownProps) => {
  return {
    ...ownProps,
    overlayActivated: getOverlayStatus(state),
    popupIsOpen: getPopupStatus(state)
  };
};

const actions = { togglePopup, toggleCommentMode };

export default connect(
  mapState,
  actions
)(AppLauncher);
