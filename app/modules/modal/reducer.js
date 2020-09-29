import {HIDE_MODAL, SHOW_MODAL} from './constants';

const initialState = {
  modalType: null,
  modalProps: {},
  show: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        modalType: action.modalType,
        modalProps: action.modalProps,
        show: true,
      };
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
};
