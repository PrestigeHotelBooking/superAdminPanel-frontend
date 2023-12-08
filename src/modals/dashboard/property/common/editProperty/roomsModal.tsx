import React, { useState, ReactNode, useEffect } from 'react';
import PrButton from '@/components/common/PrButton/PrButton';
import PrButtonV2 from '@/components/common/PrButton/PrButtonV2';
import { initialRoomDetails, RoomsContainers } from '@/components/containers/property/rooms/roomsContainers';
import { RoomDetailT } from '@/modals/dashboard/booking/common/booking.types';
import { ENDPOINTS } from '@/components/lang/EndPoints';
import { BackendPost } from '@/components/services/BackendServices';
import { toast } from 'react-toastify';
import useRoomDataHook from '@/hooks/useRoomDataHook/useRoomDataHook';

interface RoomDataMap {
  [id: string]: RoomDetailT;
}

interface RoomModalProps {
  id: string;
}

function RoomsModal({ id }: RoomModalProps): React.ReactElement {


  const {data:roomData} = useRoomDataHook(id);


  const apiLoadRoomData = () =>{

    if(roomData){
      roomData?.map((d)=>{
        const newId=d?.room_id.toString();
                const newComponent = (
          <RoomsContainers
            key={newId}
            id={newId}
            roomData={d as any} 
            propertyId={id as string}
            onDelete={deleteRoomComponent(newId)}
            onSave={saveRoomData}
          />
        );
        setRoomComponents((prevComponents) => [...prevComponents, newComponent]);
      });
    }
  }

  useEffect(()=>{
    apiLoadRoomData()
  },[roomData])

  const [roomComponents, setRoomComponents] = useState<ReactNode[]>([]);
  const [roomDataMap, setRoomDataMap] = useState<RoomDataMap>({});

  const generateUniqueId = (): string => {
    return `room_${Math.random().toString(36).substr(2, 9)}`;
  };





  const addRoomComponent = () => {
    const newId = generateUniqueId();
    const newRoomData: RoomDetailT = { ...initialRoomDetails, room_id: newId };
    setRoomDataMap((prevRoomDataMap) => ({
      ...prevRoomDataMap,
      [newId]: newRoomData,
    }));

    const newComponent = (
      <RoomsContainers
        key={newId}
        id={newId}
        propertyId={id as string}
        onDelete={deleteRoomComponent(newId)}
        onSave={saveRoomData}
      />
    );

    setRoomComponents((prevComponents) => [...prevComponents, newComponent]);
  };

  const deleteRoomComponent = (idToDelete: string) => () => {
    setRoomComponents((prevComponents) =>
      prevComponents.filter((component) => (component as React.ReactElement).key !== idToDelete),
    );

    setRoomDataMap((prevRoomDataMap) => {
      const updatedDataMap: RoomDataMap = { ...prevRoomDataMap };
      delete updatedDataMap[idToDelete];
      return updatedDataMap;
    });
  };

  const saveRoomData = (id: string, data: RoomDetailT) => {
    if (data.room_Name !== '' || data.room_type !== '' || data.no_Of_Rooms !== 0) {
      setRoomDataMap((prevRoomDataMap) => ({
        ...prevRoomDataMap,
        [id]: data,
      }));
    }
  };


  const logRoomData = async () => {
    const create = Object.values(roomDataMap);
    const data = await BackendPost(`${ENDPOINTS.ROOM.ADD}/${id}`, { create });
    if (data.success) {
      toast.success(`Data has been added successfully !`);
    } else {
      toast.error(`Unable to add the data . Something went wrong !`);
    }
  };

  return (
    <div className='mb-64'>
      {roomComponents.map((Component) => (
        <div key={(Component as React.ReactElement).key}>{Component}</div>
      ))}
      <div className='flex justify-center items-center mt-6 flex-col'>
        <PrButton
          label={'Add Rooms'}
          iconName='Plus'
          className='w-[14%]'
          onClick={addRoomComponent}
          iconPosition='right'
        />
        <div className='flex mt-12 space-x-16'>
          <PrButtonV2 label={'Save'} className='rounded-md' onClick={logRoomData} />
          <PrButtonV2 label={'Cancel'} className='rounded-md' dangerLink buttonStyle='danger' />
        </div>
      </div>
    </div>
  );
}

export default RoomsModal;
