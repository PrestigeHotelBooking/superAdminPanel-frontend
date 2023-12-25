import { PropertyDataT } from '@/modals/dashboard/property/common/components/property.types';
import { cloneDeep } from 'lodash';
import { PROPERTY_ACTION } from '../action-types/property';
import { ReduxAction } from '../common';
import { RoomDetailT } from '@/modals/dashboard/booking/common/booking.types';

export type RoomReducerState = {
  data: RoomDetailT[];
};

const initialRoomData: RoomReducerState = {
  data: [],
};

export const roomReducer = (state = initialRoomData, action: ReduxAction<any>): RoomReducerState => {
  switch (action.type) {
    case PROPERTY_ACTION.SET_PROPERTY:
      return { ...state, data: action.payload };
    default:
      return cloneDeep(state);
  }
};
