import EditPropertyTabs from "@/components/common/Card/PropertyCard/EditPropertyCard/EditPropertyTabs";
import PrIconV2 from "@/components/common/PrIcon/PrIconV2";
import { useRouter } from "next/router";
import product from '../../common/property_data.json';
import { usePropertyData } from "@/redux";
import { BackendGet } from "@/components/services/BackendServices";
import { ENDPOINTS } from "@/components/lang/EndPoints";
import { PropertyApiResponse } from "@/hooks/useProperty/usePropertyList";
import { useEffect, useState } from "react";
import usePropertySingle from "@/hooks/useProperty/usePropertySingle";

type Address = {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
};

type Property = {
  id: number;
  propertyName: string;
  address: Address;
  latitude: number;
  longitude: number;
  noOfRooms: number;
  Available: number;
};









function EditPropertyModal() {
  const router = useRouter();
  const { id } = router.query;
  const {data}=usePropertySingle(id as string);
  const handleClick =()=>{
    router.push('/dashboard/property');
  }

  
  return (
    <div className=" w-full h-full p-4">
      <div className="flex flex-1 space-x-2 p-4">
        <PrIconV2 name='ArrowBack' size='large' onClick={handleClick}></PrIconV2>
        <div className="font-semibold text-[1.5rem]">{data?.property_name}</div>
      </div>
      <div className="bg-white p-4 mb-4">
        <EditPropertyTabs id={id as string}></EditPropertyTabs>
      </div>
    </div>
  );
}

export default EditPropertyModal;
