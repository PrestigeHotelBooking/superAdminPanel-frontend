import React, { useEffect, useState } from 'react';
import PrButtonV2 from "@/components/common/PrButton/PrButtonV2";
import PrCheckbox from "@/components/common/PrCheckBox/PrCheckbox";

import { BackendPatch } from '@/components/services/BackendServices';
import { ENDPOINTS } from '@/components/lang/EndPoints';
import { toast } from 'react-toastify';
import usePropertySingle from '@/hooks/useProperty/usePropertySingle';
import useConfigurationData from '@/hooks/useConfigurationData/useConfigurationData';
import PrCircularProgressIndicator from '@/components/common/Loader/PrCircularProgressIndicator';
import { OptionT } from '../components/property.types';

type amenitiesValueT = {
  check: boolean;
  value: string;
}
type CheckedValues = Record<string, amenitiesValueT>;

function AmenitiesModal({ id }: { id: string }) {

  const [checkedValues, setCheckedValues] = useState<CheckedValues>({});
  const {data} =usePropertySingle(id);
  const {loading,amenities}=useConfigurationData();
 

  useEffect(() => {
    if (typeof data?.amenity === 'string') {
      try {
        const parsedAmenities = JSON.parse(data.amenity);
        if (Array.isArray(parsedAmenities)) {
          parsedAmenities.forEach((d) => {
            handleChange(d, { check: true, value: d });
          });
        } else {
          console.error('Amenities data is not an array:', parsedAmenities);
        }
      } catch (error) {
        console.error('Error parsing amenities:', error);
      }
    }
  }, [data]);
  


  const columnCount = 3;
  const chunkSize = Math.ceil(amenities.length / columnCount);
  const amenitiesChunks = [];

  for (let i = 0; i < amenities.length; i += chunkSize) {
    const chunk = amenities.slice(i, i + chunkSize);
    amenitiesChunks.push(chunk);
  }



  // Function to handle checkbox change
  const handleChange = (label: string, isChecked: amenitiesValueT) => {
    setCheckedValues((prevValues) => ({
      ...prevValues,
      [label]: isChecked,
    }));
  };

  // Function to handle "Save" button click
  const handleSaveClick = async () => {
    const values = Object.values(checkedValues).filter((d)=> d.check===true).map((item) => item.value);
    const data = await BackendPatch(`${ENDPOINTS.PROPERTY.UPDATE}/${id}`, { "updateData" : [{ amenity: JSON.stringify(values) }] });
    if (data.success) {
      toast.success('Update the amenities Successfully');
    } else {
      toast.error(`Unable to update the amenity`);
    }
  };

  console.log('Amenities Chunks:', amenitiesChunks);


  return (
    loading ? 
    <PrCircularProgressIndicator></PrCircularProgressIndicator>
    :
    <div className="mb-64">
    <div className="grid grid-cols-3">
      {amenitiesChunks?.map((chunk:any, chunkIndex:any) => (
        <div key={chunkIndex}>
          {chunk?.map((amenity:any, index:number) => (
            <PrCheckbox
              key={index}
              id={index.toString()} // Convert to string
              label={amenity?.label}
              onClick={(value: boolean) => handleChange(amenity?.value, { check: value, value: amenity.value })}
              value={checkedValues[amenity?.value]?.check || false} // Update how you access the check property
            />
          ))}
        </div>
      ))}
    </div>
    <div className="flex mt-12 space-x-16 justify-center">
      <PrButtonV2 label={"Save"} className="rounded-md" onClick={handleSaveClick} />
      <PrButtonV2 label={"Cancel"} className="rounded-md" dangerLink buttonStyle='danger' />
    </div>
  </div>
  );
}

export default AmenitiesModal;
