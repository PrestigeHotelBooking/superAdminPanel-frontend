import { CustomerDataT } from '@/modals/dashboard/user/common/userCommon';
import { CUSTOMER_ACTION } from '../action-types';

export const setCustomerData = (payload: CustomerDataT[]) => ({
  type: CUSTOMER_ACTION.SET_CUSTOMER,
  payload,
});

export const CUSTOMER_ACTIONS = {
  setCustomerData,
};
