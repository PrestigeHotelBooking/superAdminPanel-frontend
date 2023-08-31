import React, { useState } from 'react';
import PrButton from '@/components/common/PrButton/PrButton';
import PrButtonV2 from '@/components/common/PrButton/PrButtonV2';
import { RoomsContainers } from '@/components/containers/property/rooms/roomsContainers';

function RoomsModal() {
  const [roomComponents, setRoomComponents] = useState<React.ReactNode[]>([]);

  const addRoomComponent = () => {
    setRoomComponents(prevComponents => [...prevComponents, <RoomsContainers key={prevComponents.length} onDelete={deleteRoomComponent(prevComponents.length)} />]);
  };

  const deleteRoomComponent = (indexToDelete: number) => () => {
    setRoomComponents(prevComponents => prevComponents.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="mb-64">
      {roomComponents.map((Component, index) => (
        <div key={index}>
          {Component}
        </div>
      ))}
      <div className="flex justify-center items-center mt-6 flex-col">
        <PrButton
          label={"Add Rooms"}
          iconName='Plus'
          className="w-[13%]"
          onClick={addRoomComponent}
          iconPosition='right'
        />
        <div className="flex mt-12 space-x-16">
          <PrButtonV2 label={"Save"} className="rounded-md" />
          <PrButtonV2 label={"Cancel"} className="rounded-md" dangerLink buttonStyle='danger' />
        </div>
      </div>
    </div>
  );
}

export default RoomsModal;
