import { updateComponentReducer } from './updateComponentReducer';
import { getIDproductReducer } from './getIDproductReducer';

import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  updateComponentState: updateComponentReducer,
  getIDState: getIDproductReducer
});