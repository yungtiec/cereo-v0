import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindEvent } from "utils";

const LauncherMessageListener = () => {
  useEffect(() => {
    bindEvent(window, "message", function(e) {
      console.log("launcher: ", e);
      if (e.data.type === "UPDATE_COMMENT_BOX_STATUS") {
        console.log(" UPDATE_COMMENT_BOX_STATUS");
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
