import { useEffect, useState } from 'react';
import { BackendGet } from '@/components/services/BackendServices';
import { ENDPOINTS } from '@/components/lang/EndPoints';

interface RoomDetailsT {
  room_id: number;
  property_id: number;
  room_type: string;
  room_image_urls: string;
  smoking_preference: number;
  max_adult: number;
  max_child: number;
  breakfast_included: number;
  room_admin_id: number;
  available: number;
  current_booking_id: number;
  room_amenities: string;
  room_Name: string;
  no_Of_Rooms: number | null;
  price_Per_Night: number | null;
  bed_Type: string | null;
  room_Size: string | null;
  no_Of_Adults: number | null;
  no_of_Children: number | null;
  extra_Bed_Allowed: number | null;
  no_Of_ExtraBeds: number | null;
  price_Per_ExtraBed: number | null;
  smoke_Free_Room: number | null;
  meal_Option: number | null;
  is_deleted: number | null;
  createdAt: string;
}

export interface RoomApiResponse {
  responseData: {
    message: RoomDetailsT[];
  };
}

export interface RoomHookResult {
  loading: boolean;
  data: RoomDetailsT[];
  error: Error | null;
  fetchRoom: () => Promise<void>;
}

const useRoomDataHook = (id: string): RoomHookResult => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchRoom = async () => {
    try {
      const data = await BackendGet<RoomApiResponse>(`${ENDPOINTS.ROOM.GET}/${id}`);
      if (data.success) {
        setData(data.responseData['message']);
      }
      setLoading(false);
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, [id]);

  return { loading, data, error, fetchRoom };
};

export default useRoomDataHook;
