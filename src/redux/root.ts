import { combineReducers } from 'redux';
import { propertyReducer, PropertyReducerState } from './reducers/property';
import { ROOT_ACTION } from './action-types';
import { configurationReducer, ConfigurationReducerState, CustomerReducerState } from '.';

export interface rootReducersI {
  property: PropertyReducerState;
  customer: CustomerReducerState;
  configuration: ConfigurationReducerState;
}

export const reducers = {
  property: propertyReducer,
  configuration: configurationReducer,
};

export const CombinedReducers = combineReducers(reducers);
export type RootReducerType = typeof CombinedReducers;
export const rootReducer: RootReducerType = (state, action) => {
  const newState = action.type === ROOT_ACTION.RESET ? undefined : state;
  return CombinedReducers(newState, action);
};
