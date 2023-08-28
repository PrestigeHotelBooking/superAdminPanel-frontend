import { combineReducers } from 'redux';
import { propertyReducer, PropertyReducerState } from './reducers/property';
import {ROOT_ACTION} from './action-types';
export interface rootReducersI {
  property: PropertyReducerState;
}

export const reducers = {
  property: propertyReducer,
};

export const CombinedReducers = combineReducers(reducers);
export type RootReducerType = typeof CombinedReducers;
export const rootReducer: RootReducerType = (state, action) => {
  const newState = action.type === ROOT_ACTION.RESET ? undefined : state;
  return CombinedReducers(newState, action);
};
