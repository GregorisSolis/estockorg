import { GET_ID_PRODUCT } from '../actions/actionTypes';

const initialState = {
  productID: 0
};

export const getIDproductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ID_PRODUCT:
      return {
        ...state,
        productID: action.productID
      };
    default:
      return state;
  }
};