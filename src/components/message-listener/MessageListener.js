import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindEvent } from "utils";

const MessageListener = ({}) => {
  useEffect(() => {
    bindEvent(window, "message", function(e) {
      console.log(e.data);
      if (e.data.type === "init comment") {
        console.log("init comment");
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
)(MessageListener);
