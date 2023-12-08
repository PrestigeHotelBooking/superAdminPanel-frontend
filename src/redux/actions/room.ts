
import { RoomDetailT } from '@/modals/dashboard/booking/common/booking.types';
import { ROOM_ACTION } from '../action-types';

export const setRoomData = (payload: RoomDetailT[]) => ({
  type: ROOM_ACTION.SET_ROOM,
  payload,
});

export const ROOM_ACTIONS = {
  setRoomData,
};
