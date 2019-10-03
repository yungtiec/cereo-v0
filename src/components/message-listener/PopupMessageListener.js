import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindEvent } from "utils";
import {
  updateCommentBox,
  registerUserScreenSize,
  updateEditorStatus,
  resetEditor
} from "store-popup";

const PopupMessageListener = ({
  updateCommentBox,
  updateEditorStatus,
  resetEditor,
  registerUserScreenSize
}) => {
  useEffect(() => {
    bindEvent(window, "message", function(e) {
      console.log("popup iframe");
      if (e.data.type === "UPDATE_COMMENT_BOX_STATUS") {
        console.log("UPDATE_COMMENT_BOX_STATUS");
        updateCommentBox(e.data.commentBox);
      }
      if (e.data.type === "OPEN_EDITOR") {
        updateEditorStatus(true, e.data.pageInfo);
      }
      if (e.data.type === "RESET_EDITOR") {
        resetEditor();
      }
      if (e.data.type === "REGISTER_USER_SCREEN_SIZE") {
        console.log("REGISTER_USER_SCREEN_SIZE");
        registerUserScreenSize({
          screenWidth: e.data.screenWidth,
          screenHeight: e.data.screenHeight
        });
      }
    });
  }, []);

  return null;
};

const mapState = (state, ownProps) => {
  return {};
};

const actions = {
  updateCommentBox,
  registerUserScreenSize,
  updateEditorStatus,
  resetEditor
};

export default connect(
  mapState,
  actions
)(PopupMessageListener);
