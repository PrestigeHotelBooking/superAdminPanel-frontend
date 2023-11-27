import { PropertyDataT } from '@/modals/dashboard/property/common/components/property.types';
import { cloneDeep } from 'lodash';
import { PROPERTY_ACTION } from '../action-types/property';
import { ReduxAction } from '../common';
import { CustomerDataT } from '@/modals/dashboard/user/common/userCommon';
import { CUSTOMER_ACTION } from '../action-types';

export type CustomerReducerState = {
  data: CustomerDataT[];
};

const initialPropertyData: CustomerReducerState = {
  data: [],
};

export const customerReducer = (state = initialPropertyData, action: ReduxAction<any>): CustomerReducerState => {
  switch (action.type) {
    case CUSTOMER_ACTION.SET_CUSTOMER:
      return { ...state, data: action.payload };
    default:
      return cloneDeep(state);
  }
};
