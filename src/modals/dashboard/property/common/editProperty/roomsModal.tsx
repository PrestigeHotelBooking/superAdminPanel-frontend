import React, { useState, ReactNode } from 'react';
import PrButton from '@/components/common/PrButton/PrButton';
import PrButtonV2 from '@/components/common/PrButton/PrButtonV2';
import { roomDetailsT, initialRoomDetails, RoomsContainers } from '@/components/containers/property/rooms/roomsContainers';

interface RoomDataMap {
  [id: string]: roomDetailsT;
}

interface RoomModalProps {
  id: string;
}

function RoomsModal({ id }: RoomModalProps): React.ReactElement {
  const [roomComponents, setRoomComponents] = useState<ReactNode[]>([]);
  const [roomDataMap, setRoomDataMap] = useState<RoomDataMap>({});

  const generateUniqueId = (): string => {
    return `room_${Math.random().toString(36).substr(2, 9)}`;
  };
  
  const addRoomComponent = () => {
    const newId = generateUniqueId();
    const newRoomData: roomDetailsT = { ...initialRoomDetails, id: newId };
    setRoomDataMap((prevRoomDataMap) => ({
      ...prevRoomDataMap,
      [newId]: newRoomData,
    }));
  
    const newComponent = (
      <RoomsContainers
        key={newId}  
        id={newId}
        onDelete={deleteRoomComponent(newId)}
        onSave={saveRoomData}
      />
    );
  
    setRoomComponents((prevComponents) => [...prevComponents, newComponent]);
  };


  const deleteRoomComponent = (idToDelete: string) => () => {
    setRoomComponents((prevComponents) =>
      prevComponents.filter((component) => (component as React.ReactElement).key !== idToDelete)
    );
  
    setRoomDataMap((prevRoomDataMap) => {
      const updatedDataMap: RoomDataMap = { ...prevRoomDataMap };
      delete updatedDataMap[idToDelete];
      return updatedDataMap;
    });
  };

  
  const saveRoomData = (id: string, data: roomDetailsT) => {
    if (data.roomName !== '' || data.roomType !== '' || data.noOfRooms !== 0) {
      setRoomDataMap((prevRoomDataMap) => ({
        ...prevRoomDataMap,
        [id]: data,
      }));
    }
  };
  
  const logRoomData = () => {
 console.log(roomDataMap)
  };

  return (
    <div className="mb-64">
      {roomComponents.map((Component) => (
        <div key={(Component as React.ReactElement).key}>{Component}</div>
      ))}
      <div className="flex justify-center items-center mt-6 flex-col">
        <PrButton
          label={"Add Rooms"}
          iconName="Plus"
          className="w-[14%]"
          onClick={addRoomComponent}
          iconPosition="right"
        />
        <div className="flex mt-12 space-x-16">
          <PrButtonV2 label={"Save"} className="rounded-md" onClick={logRoomData} />
          <PrButtonV2
            label={"Cancel"}
            className="rounded-md"
            dangerLink
            buttonStyle="danger"
          />
        </div>
      </div>
    </div>
  );
}

export default RoomsModal;
