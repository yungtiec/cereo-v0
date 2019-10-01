import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindEvent } from "utils";

const LauncherMessageListener = () => {
  useEffect(() => {
    bindEvent(window, "message", function(e) {
      console.log("launcher: ", e);
      if (e.data.type === "updateCommentBox") {
        console.log(" updateCommentBox");
      }
    });
  }, []);

  return null;
};

const mapState = (state, ownProps) => {
  return {};
};

const actions = {};

export default connect(
  mapState,
  actions
)(LauncherMessageListener);
