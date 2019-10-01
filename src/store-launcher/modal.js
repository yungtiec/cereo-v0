export const SHOW_MODAL = "modal.SHOW_MODAL";
export const HIDE_MODAL = "modal.HIDE_MODAL";
export const UPDATE_MODAL_PROPS = "modal.UPDATE_MODAL_PROPS";

const initialState = {
  modalType: null,
  modalProps: {}
};

export const loadModal = ({ modalType, modalProps }) => {
  return {
    type: SHOW_MODAL,
    modalType,
    modalProps
  };
};

export const updateModalProps = modalProps => {
  return {
    type: UPDATE_MODAL_PROPS,
    modalProps
  };
};

export const hideModal = () => {
  return {
    type: HIDE_MODAL
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        modalType: action.modalType,
        modalProps: action.modalProps
      };
    case UPDATE_MODAL_PROPS:
      return {
        ...state,
        modalProps: action.modalProps
      };
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}
