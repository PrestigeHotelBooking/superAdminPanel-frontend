import React, { useState } from 'react';
import PrButton from '@/components/common/PrButton/PrButton';
import PrButtonV2 from '@/components/common/PrButton/PrButtonV2';
import { RoomsContainers, roomDetailsT, initialRoomDetails } from '@/components/containers/property/rooms/roomsContainers';

// RoomsModal.tsx
function RoomsModal() {
  const [roomComponents, setRoomComponents] = useState<React.ReactNode[]>([]);
  const [roomDataList, setRoomDataList] = useState<roomDetailsT[]>([]);

  const addRoomComponent = () => {
    const newRoomData: roomDetailsT = { ...initialRoomDetails };
    setRoomDataList((prevRoomDataList) => [...prevRoomDataList, newRoomData]);

    const newComponent = (
      <RoomsContainers
        key={roomDataList.length}
        onDelete={deleteRoomComponent(roomDataList.length)}
        onSave={saveRoomData} // Pass the saveRoomData function
      />
    );

    setRoomComponents((prevComponents) => [...prevComponents, newComponent]);
  };

  const deleteRoomComponent = (indexToDelete: number) => () => {
    setRoomDataList((prevRoomDataList) =>
      prevRoomDataList.filter((_, index) => index !== indexToDelete)
    );

    setRoomComponents((prevComponents) =>
      prevComponents.filter((_, index) => index !== indexToDelete)
    );
  };

  // Callback function to save room data
  const saveRoomData = (data: roomDetailsT) => {
    // Check if the room data is filled
    if (data.roomName !== '' || data.roomType !== '' || data.noOfRooms !== 0 /* Add more conditions as needed */) {
      setRoomDataList((prevRoomDataList) => [...prevRoomDataList, data]);
    }
  };
  

  const logRoomData = () => {
    console.log(roomDataList);
  };


  return (
    <div className="mb-64">
      {roomComponents.map((Component, index) => (
        <div key={index}>{Component}</div>
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
