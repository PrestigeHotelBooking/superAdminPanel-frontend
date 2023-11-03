import PrButtonV2 from "@/components/common/PrButton/PrButtonV2";
import PrInputField from "@/components/common/PrInputField/PrInputField";
import PrRadioButton from "@/components/common/PrRadioButton/PrRadioButton";
import PrSelect from "@/components/common/PrSelect/PrSelect";
import useConfigurationData from "@/hooks/useConfigurationData/useConfigurationData";
import {yesOrNoOption} from "@/modals/dashboard/property/common/components/property.types";
import { useEffect, useState } from "react";

export interface roomDetailsT {
  id:string;
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
  smokeFree: string;
  mealOption: string;
}

export const initialRoomDetails: roomDetailsT = {
  id:'',
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
  smokeFree: '',
  mealOption: '',
};


export const RoomsContainers = ({
  id,
  onDelete,
  onSave
}: {
  id: string;
  onDelete: () => void;
  onSave: (id: string, data: roomDetailsT) => void;
}) => {


  useEffect(()=>{
    handleState({ id:id })
  },[id]);

  const {loading,bedType,roomType,mealTypes}=useConfigurationData();
 

  const [roomDataDetail, setRoomData] = useState<roomDetailsT>(initialRoomDetails);

  const handleState = (data: Partial<roomDetailsT>) => {
    setRoomData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  const handleSave = () => {
    onSave(id,roomDataDetail);
  };




  return (
    <div className="mt-8 space-y-6">
      <div className="grid grid-cols-9 gap-4">
        <div className="col-span-4">
          <PrInputField
            className="w-full"
            type="text"
            label="Room Name"
            value={roomDataDetail.roomName}
            onChange={(e) => handleState({ roomName: e.target.value })}
          />
        </div>
        <div className="col-span-3">
          <PrSelect
            label="Room Type"
            options={roomType}
            className="w-full font-bold"
            value={roomDataDetail.roomType}
            onChange={(value) => handleState({ roomType: value })}
          />
        </div>
        <div className="col-span-1">
          <PrInputField
            className="w-full"
            type="number"
            label="No. of Rooms"
            value={roomDataDetail.noOfRooms}
            onChange={(e) => handleState({ noOfRooms: parseInt(e.target.value) })}
          />
        </div>
        <div className="col-span-1">
          <PrInputField
            className="w-full"
            type="number"
            label="Price/Night"
            value={roomDataDetail.priceNight}
            onChange={(e) => handleState({ priceNight: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div className="grid grid-cols-9 gap-4">
        <div className="col-span-4">
          <PrSelect
            label="Bed Type"
            options={bedType}
            className="w-full font-bold"
            value={roomDataDetail.bedType}
            onChange={(value) => handleState({ bedType: value })}
          />
        </div>
        <div className="col-span-3">
          <PrInputField
            className="w-full"
            type="text"
            label="Room Size"
            value={roomDataDetail.roomSize}
            onChange={(e) => handleState({ roomSize: e.target.value })}
          />
        </div>
        <div className="col-span-1">
          <PrInputField
            className="w-full"
            type="number"
            label="No. of Adults"
            value={roomDataDetail.noOfAdults}
            onChange={(e) => handleState({ noOfAdults: parseInt(e.target.value) })}
          />
        </div>
        <div className="col-span-1">
          <PrInputField
            className="w-full"
            type="number"
            label="No. of Children"
            value={roomDataDetail.noOfChildren}
            onChange={(e) => handleState({ noOfChildren: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <PrRadioButton
          options={yesOrNoOption}
          label="Extra Bed Allowed"
          selectedValue={roomDataDetail.extraBedAllowed}
          className="w-full"
          onChange={(value) => handleState({ extraBedAllowed: value })}
        />
        <div className="m-auto w-[74%]">
          <PrInputField
            className="w-full"
            type="number"
            label="No. of Extra Bed"
            value={roomDataDetail.noOfExtraBed}
            onChange={(e) => handleState({ noOfExtraBed: parseInt(e.target.value) })}
          />
        </div>
        <div className="m-auto w-[50%]">
          <PrInputField
            className="w-full"
            type="number"
            label="Price / Extra Bed"
            value={roomDataDetail.priceNightExtraBed}
            onChange={(e) => handleState({ priceNightExtraBed: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <PrRadioButton
          options={yesOrNoOption}
          label="Smoke Free Room"
          selectedValue={roomDataDetail.smokeFree}
          className="w-full"
          onChange={(value) => handleState({ smokeFree:value })}
        />
        <div className="m-auto w-[74%]">
          <PrSelect
            label="Meal Option"
            className="w-full font-bold"
            options={mealTypes}
            value={roomDataDetail.mealOption}
            onChange={(value) => handleState({ mealOption: value })}
          />
        </div>
        <div className="flex justify-center items-center w-[48%] space-x-4 mt-5">
          <PrButtonV2 label="Save" buttonStyle='success' onClick={handleSave} className="rounded-md" />
          <PrButtonV2 label="Delete" buttonStyle="danger" onClick={onDelete} className="rounded-md" />
        </div>
      </div>
    </div>
  );
};
