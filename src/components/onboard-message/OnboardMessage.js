import React from "react";
import { connect } from "react-redux";
import { Button } from "antd";

import { isOnboardMessage, onboarded } from "store-popup";

const OnboardMessage = ({ showOnboardMessage, onboarded }) =>
  showOnboardMessage ? (
    <div style={{ textAlign: "center" }}>
      <p>Click anywhere to make a comment</p>
      <Button
        type="primary"
        htmlType="button"
        onClick={() => {
          window.parent.postMessage({ type: "SET_POPUP_TO_WIDGET_SIZE" }, "*");
          window.parent.postMessage(
            { type: "UPDATE_POPUP_STATUS", popup: false },
            "*"
          );
          onboarded();
        }}
      >
        Let's get started
      </Button>
    </div>
  ) : null;

const mapState = (state, ownProps) => {
  return {
    ...ownProps,
    showOnboardMessage: isOnboardMessage(state)
  };
};

const actions = {
  onboarded
};

export default connect(
  mapState,
  actions
)(OnboardMessage);
