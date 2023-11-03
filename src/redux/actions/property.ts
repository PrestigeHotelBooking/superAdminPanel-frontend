

import { PropertyDataT } from '@/modals/dashboard/property/common/components/property.types';
import { PROPERTY_ACTION } from '../action-types/property';

export const setPropertyData = (payload: PropertyDataT[]) => ({
  type: PROPERTY_ACTION.SET_PROPERTY,
  payload,
});

export const PROPERTY_ACTIONS = {
  setPropertyData,
};
