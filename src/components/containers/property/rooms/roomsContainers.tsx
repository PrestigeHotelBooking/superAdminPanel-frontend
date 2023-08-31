import PrButtonV2 from "@/components/common/PrButton/PrButtonV2";
import PrInputField from "@/components/common/PrInputField/PrInputField";
import PrRadioButton from "@/components/common/PrRadioButton/PrRadioButton";
import PrSelect from "@/components/common/PrSelect/PrSelect";
import {
  bedTypes,
  mealTypes,
  roomTypes,
  yesOrNoOption,
} from "@/modals/dashboard/property/common/property.types";
import { useState } from "react";

interface roomDetailsT {
  roomName: string;
  roomType: string;
  noOfRooms: number;
  priceNight: number;
  bedType: string;
  roomSize: string;
  noOfAdults: number;
  noOfChildren: number;
  extraBedAllowed: string;
  noOfExtraBed: number;
  priceNightExtraBed: number;
  smokeFree: number;
  mealOption: string;
}

const initialRoomDetails: roomDetailsT = {
  roomName: '',
  roomType: '',
  noOfRooms: 0,
  priceNight: 0,
  bedType: '',
  roomSize: '',
  noOfAdults: 0,
  noOfChildren: 0,
  extraBedAllowed: '',
  noOfExtraBed: 0,
  priceNightExtraBed: 0,
  smokeFree: 0,
  mealOption: '',
};

export const RoomsContainers = ({ onDelete }: { onDelete: () => void }) => {
  const [roomData, setRoomData] = useState<roomDetailsT>(initialRoomDetails);

  const handleState = (data: Partial<roomDetailsT>) => {
    setRoomData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };



  return (
    <div className="mt-8 space-y-6">
      <div className="grid grid-cols-9 gap-4">
        <div className="col-span-4">
          <PrInputField
            className="w-full"
            type="number"
            label="Room Name"
            value={roomData.roomName}
            onChange={(e) => handleState({ roomName: e.target.value })}
          />
        </div>
        <div className="col-span-3">
          <PrSelect
            label="Room Type"
            options={roomTypes}
            className="w-full font-bold"
            value={roomData.roomType}
            onChange={(value) => handleState({ roomType: value })}
          />
        </div>
        <div className="col-span-1">
          <PrInputField
            className="w-full"
            type="number"
            label="No. of Rooms"
            value={roomData.noOfRooms}
            onChange={(e) => handleState({ noOfRooms: parseInt(e.target.value) })}
          />
        </div>
        <div className="col-span-1">
          <PrInputField
            className="w-full"
            type="number"
            label="Price/Night"
            value={roomData.priceNight}
            onChange={(e) => handleState({ priceNight: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div className="grid grid-cols-9 gap-4">
        <div className="col-span-4">
          <PrSelect
            label="Bed Type"
            options={bedTypes}
            className="w-full font-bold"
            value={roomData.bedType}
            onChange={(value) => handleState({ bedType: value })}
          />
        </div>
        <div className="col-span-3">
          <PrInputField
            className="w-full"
            type="text"
            label="Room Size"
            value={roomData.roomSize}
            onChange={(e) => handleState({ roomSize: e.target.value })}
          />
        </div>
        <div className="col-span-1">
          <PrInputField
            className="w-full"
            type="number"
            label="No. of Adults"
            value={roomData.noOfAdults}
            onChange={(e) => handleState({ noOfAdults: parseInt(e.target.value) })}
          />
        </div>
        <div className="col-span-1">
          <PrInputField
            className="w-full"
            type="number"
            label="No. of Children"
            value={roomData.noOfChildren}
            onChange={(e) => handleState({ noOfChildren: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <PrRadioButton
          options={yesOrNoOption}
          label="Extra Bed Allowed"
          selectedValue={roomData.extraBedAllowed}
          className="w-full"
          onChange={(value) => handleState({ extraBedAllowed: value })}
        />
        <div className="m-auto w-[74%]">
          <PrInputField
            className="w-full"
            type="number"
            label="No. of Extra Bed"
            value={roomData.noOfExtraBed}
            onChange={(e) => handleState({ noOfExtraBed: parseInt(e.target.value) })}
          />
        </div>
        <div className="m-auto w-[50%]">
          <PrInputField
            className="w-full"
            type="number"
            label="Price / Extra Bed"
            value={roomData.priceNightExtraBed}
            onChange={(e) => handleState({ priceNightExtraBed: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <PrRadioButton
          options={yesOrNoOption}
          label="Smoke Free Room"
          selectedValue={roomData.smokeFree.toString()}
          className="w-full"
          onChange={(value) => handleState({ smokeFree: parseInt(value) })}
        />
        <div className="m-auto w-[74%]">
          <PrSelect
            label="Meal Option"
            className="w-full font-bold"
            options={mealTypes}
            value={roomData.mealOption}
            onChange={(value) => handleState({ mealOption: value })}
          />
        </div>
        <div className="flex justify-center items-center w-[48%]">
          <PrButtonV2 label="Delete" buttonStyle="danger" onClick={onDelete} className="rounded-md" />
        </div>
      </div>
    </div>
  );
};
