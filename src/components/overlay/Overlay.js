import React from "react";
import { overlay } from "./Overlay.module.scss";
import { connect } from "react-redux";
import { getOverlayStatus } from "store-launcher";

const Overlay = ({ overlayIsOpen }) =>
  overlayIsOpen ? <div className={overlay}></div> : null;

const mapState = (state, ownProps) => {
  return {
    ...ownProps,
    overlayIsOpen: getOverlayStatus(state)
  };
};

const actions = {};

export default connect(
  mapState,
  actions
)(Overlay);
