import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindEvent } from "utils";
import { updateCommentBox } from "store-popup";

const PopupMessageListener = ({ updateCommentBox }) => {
  useEffect(() => {
    bindEvent(window, "message", function(e) {
      console.log("popup: ", e);
      if (e.data.type === "updateCommentBox") {
        console.log("updateCommentBox");
        updateCommentBox(e.data.commentBox);
      }
    });
  }, []);

  return null;
};

const mapState = (state, ownProps) => {
  return {};
};

const actions = {
  updateCommentBox
};

export default connect(
  mapState,
  actions
)(PopupMessageListener);
