import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindEvent } from "utils";
import { updatePopup } from "store-launcher";

const LauncherMessageListener = ({ updatePopup }) => {
  useEffect(() => {
    bindEvent(window, "message", function(e) {
      console.log("launcher: ", e);
      if (e.data.type === "UPDATE_POPUP_STATUS") {
        console.log(" UPDATE_POPUP_STATUS");
        updatePopup(e.data.popup);
      }
    });
  }, []);

  return null;
};

const mapState = (state, ownProps) => {
  return {};
};

const actions = { updatePopup };

export default connect(
  mapState,
  actions
)(LauncherMessageListener);
