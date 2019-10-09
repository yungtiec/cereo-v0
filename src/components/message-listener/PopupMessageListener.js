import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindEvent } from "utils";
import {
  updatePopup,
  registerUserScreenSize,
  updateEditorStatus,
  updatePageInfo,
  resetEditorData,
  updateCommentItemStatus
} from "store-popup";

const PopupMessageListener = ({
  updatePopup,
  updatePageInfo,
  updateEditorStatus,
  resetEditorData,
  registerUserScreenSize,
  updateCommentItemStatus
}) => {
  useEffect(() => {
    bindEvent(window, "message", function(e) {
      console.log("popup iframe", e);
      if (e.data.type === "UPDATE_POPUP_STATUS") {
        console.log("UPDATE_POPUP_STATUS");
        updatePopup(e.data.popup);
      }
      if (e.data.type === "OPEN_EDITOR") {
        updateEditorStatus(true);
        updatePageInfo(e.data.pageInfo);
      }
      if (e.data.type === "RESET_EDITOR") {
        updateEditorStatus(false);
        resetEditorData();
      }
      if (e.data.type === "REGISTER_USER_SCREEN_SIZE") {
        console.log("REGISTER_USER_SCREEN_SIZE");
        registerUserScreenSize({
          screenWidth: e.data.screenWidth,
          screenHeight: e.data.screenHeight
        });
      }
      if (e.data.type === "UPDATE_COMMENT_ITEM_STATUS") {
        updateCommentItemStatus(e.data.commentId);
        updatePopup(true);
      }
    });
  }, []);

  return null;
};

const mapState = (state, ownProps) => {
  return {};
};

const actions = {
  updatePopup,
  registerUserScreenSize,
  updateEditorStatus,
  updatePageInfo,
  resetEditorData,
  updateCommentItemStatus
};

export default connect(
  mapState,
  actions
)(PopupMessageListener);
