import { GET_ID_PRODUCT } from './actionTypes';
import { COMPONENT_UPDATE_VALUE } from './actionTypes';

export const setProductID = id => ({
  type: GET_ID_PRODUCT,
  productID: id
});

export const clickButton = newValue => ({
  type: COMPONENT_UPDATE_VALUE,
  value: newValue
});


