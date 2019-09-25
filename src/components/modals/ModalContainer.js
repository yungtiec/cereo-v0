import React from "react";
import { connect } from "react-redux";

/** Modal Components */
// import {} from "./index";

/** Modal Type Constants **/
const MODAL_COMPONENTS = {};

const ModalContainer = ({ modalType, modalProps }) => {
  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];

  return <SpecificModal {...modalProps} />;
};

export default connect(state => state.modals || {})(ModalContainer);
