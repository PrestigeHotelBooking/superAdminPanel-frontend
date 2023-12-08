import PrButtonV2 from '@/components/common/PrButton/PrButtonV2';
import PrInputField from '@/components/common/PrInputField/PrInputField';
import PrRadioButton from '@/components/common/PrRadioButton/PrRadioButton';
import PrSelect from '@/components/common/PrSelect/PrSelect';
import useConfigurationData from '@/hooks/useConfigurationData/useConfigurationData';
import { RoomDetailT } from '@/modals/dashboard/booking/common/booking.types';
import { yesOrNoOption } from '@/modals/dashboard/property/common/components/property.types';
import { useEffect, useState } from 'react';

export const initialRoomDetails: RoomDetailT = {
  room_id: 0,
  property_id: '',
  room_type: '',
  room_image_urls: [],
  smoking_preference: '',
  max_adult: 0,
  max_child: 0,
  breakfast_included: 0,
  room_admin_id: '',
  available: 0,
  current_booking_id: '',
  room_amenities: '',
  room_Name: '',
  no_Of_Rooms: 0,
  price_Per_Night: 0,
  bed_Type: '',
  room_Size: 0,
  no_Of_Adults: 0,
  no_of_Children: 0,
  extra_Bed_Allowed: 0,
  no_Of_ExtraBeds: 0,
  price_Per_ExtraBed: 0,
  smoke_Free_Room: 0,
  meal_Option: '',
};

export const RoomsContainers = ({
  id,
  propertyId,
  roomData,
  onDelete,
  onSave,
}: {
  id: string;
  propertyId: number | string;
  roomData?: RoomDetailT;
  onDelete: () => void;
  onSave: (id: string, data: RoomDetailT) => void;
}) => {
  useEffect(() => {
    handleState({ room_id: id, property_id: propertyId });
  }, [id]);

  const { bedType, roomType, mealTypes } = useConfigurationData();

  const [roomDataDetail, setRoomData] = useState<RoomDetailT>(initialRoomDetails);

  useEffect(() => {
    handleState({
      ...roomDataDetail,
      room_Name: roomData?.room_Name,
      room_Size: roomData?.room_Size,
      room_type: roomData?.room_type,
      no_of_Children: roomData?.no_of_Children,
      no_Of_Rooms: roomData?.no_Of_Rooms,
      bed_Type: roomData?.bed_Type,
      breakfast_included:roomData?.breakfast_included,
      price_Per_Night: roomData?.price_Per_Night,
      price_Per_ExtraBed: roomData?.price_Per_ExtraBed,
      meal_Option: roomData?.meal_Option,
      no_Of_Adults: roomData?.no_Of_Adults,
      no_Of_ExtraBeds: roomData?.no_Of_ExtraBeds,
    });
  }, [roomData]);

  const handleState = (data: Partial<RoomDetailT>) => {
    setRoomData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  const handleSave = () => {
    onSave(id, roomDataDetail);
  };

  return (
    <div className='mt-8 space-y-6'>
      <div className='grid grid-cols-9 gap-4'>
        <div className='col-span-4'>
          <PrInputField
            className='w-full'
            type='text'
            label='Room Name'
            value={roomDataDetail.room_Name}
            onChange={(e) => handleState({ room_Name: e.target.value })}
          />
        </div>
        <div className='col-span-3'>
          <PrSelect
            label='Room Type'
            options={roomType}
            className='w-full font-bold'
            value={roomDataDetail.room_type}
            onChange={(value) => handleState({ room_type: value })}
          />
        </div>
        <div className='col-span-1'>
          <PrInputField
            className='w-full'
            type='number'
            label='No. of Rooms'
            value={roomDataDetail.no_Of_Rooms}
            onChange={(e) => handleState({ no_Of_Rooms: parseInt(e.target.value) })}
          />
        </div>
        <div className='col-span-1'>
          <PrInputField
            className='w-full'
            type='number'
            label='Price/Night'
            value={roomDataDetail.price_Per_Night}
            onChange={(e) => handleState({ price_Per_Night: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div className='grid grid-cols-9 gap-4'>
        <div className='col-span-4'>
          <PrSelect
            label='Bed Type'
            options={bedType}
            className='w-full font-bold'
            value={roomDataDetail.bed_Type}
            onChange={(value) => handleState({ bed_Type: value })}
          />
        </div>
        <div className='col-span-3'>
          <PrInputField
            className='w-full'
            type='number'
            label='Room Size'
            value={roomDataDetail.room_Size}
            onChange={(e) => handleState({ room_Size: e.target.value })}
          />
        </div>
        <div className='col-span-1'>
          <PrInputField
            className='w-full'
            type='number'
            label='No. of Adults'
            value={roomDataDetail.no_Of_Adults}
            onChange={(e) => handleState({ no_Of_Adults: parseInt(e.target.value) })}
          />
        </div>
        <div className='col-span-1'>
          <PrInputField
            className='w-full'
            type='number'
            label='No. of Children'
            value={roomDataDetail.no_of_Children}
            onChange={(e) => handleState({ no_of_Children: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div className='flex justify-center space-x-4'>
        <PrRadioButton
          options={yesOrNoOption}
          label='Extra Bed Allowed'
          selectedValue={roomDataDetail.extra_Bed_Allowed as string}
          className='w-full'
          onChange={(value) => handleState({ extra_Bed_Allowed: value })}
        />
        <div className='m-auto w-[74%]'>
          <PrInputField
            className='w-full'
            type='number'
            label='No. of Extra Bed'
            value={roomDataDetail.no_Of_ExtraBeds}
            onChange={(e) => handleState({ no_Of_ExtraBeds: parseInt(e.target.value) })}
          />
        </div>
        <div className='m-auto w-[50%]'>
          <PrInputField
            className='w-full'
            type='number'
            label='Price / Extra Bed'
            value={roomDataDetail.price_Per_Night}
            onChange={(e) => handleState({ price_Per_Night: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div className='flex justify-center space-x-4'>
        <PrRadioButton
          options={yesOrNoOption}
          label='Smoke Free Room'
          selectedValue={roomDataDetail.smoke_Free_Room}
          className='w-full'
          onChange={(value) => handleState({ smoke_Free_Room: Number(value) })}
        />
        <div className='m-auto w-[74%]'>
          <PrSelect
            label='Meal Option'
            className='w-full font-bold'
            options={mealTypes}
            value={roomDataDetail.meal_Option}
            onChange={(value) => handleState({ meal_Option: value })}
          />
        </div>
        <div className='flex justify-center items-center w-[48%] space-x-4 mt-5'>
          <PrButtonV2
            label='Save'
            buttonStyle='success'
            onClick={() => {
              handleSave();
            }}
            className='rounded-md'
          />
          <PrButtonV2 label='Delete' buttonStyle='danger' onClick={onDelete} className='rounded-md' />
        </div>
      </div>
    </div>
  );
};
