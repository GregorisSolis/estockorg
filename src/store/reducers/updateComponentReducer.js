import { COMPONENT_UPDATE_VALUE } from '../actions/actionTypes';

const initialState = {
  value: false
};

export const updateComponentReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPONENT_UPDATE_VALUE:
      return {
        ...state,
        value: action.value
      };
    default:
      return state;
  }
};