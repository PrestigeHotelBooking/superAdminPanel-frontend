import React, { useState } from 'react';
import PrButtonV2 from "@/components/common/PrButton/PrButtonV2";
import PrCheckbox from "@/components/common/PrCheckBox/PrCheckbox";
import { Amenities } from "@/components/containers/property/amenities/commonAmenities";
import { BackendPost } from '@/components/services/BackendServices';
import { ENDPOINTS } from '@/components/lang/EndPoints';

function AmenitiesModal({ id }: { id: string }) {
  const columnCount = 3;
  const chunkSize = Math.ceil(Amenities.length / columnCount);
  const amenitiesChunks = [];

  for (let i = 0; i < Amenities.length; i += chunkSize) {
    const chunk = Amenities.slice(i, i + chunkSize);
    amenitiesChunks.push(chunk);
  }

  // Define the type for checkedValues
  type CheckedValues = Record<string, boolean>;

  // Initialize checkedValues with an empty object
  const [checkedValues, setCheckedValues] = useState<CheckedValues>({});

  // Function to handle checkbox change
  const handleChange = (label: string, isChecked: boolean) => {
    setCheckedValues((prevValues) => ({
      ...prevValues,
      [label]: isChecked,
    }));
  };

  // Function to handle "Save" button click
  const handleSaveClick = () => {
    const data=BackendPost(ENDPOINTS.PROPERTY.ADD_AMENITIES,{
      propertyID:id,
      amenities:Object.keys(checkedValues)});
  };

  return (
    <div className="mb-64">
      <div className="grid grid-cols-3">
        {amenitiesChunks.map((chunk, chunkIndex) => (
          <div key={chunkIndex}>
            {chunk.map((amenity, index) => (
              <PrCheckbox
                key={index}
                id={index.toString()} // Convert to string
                label={amenity.label}
                onClick={(value: boolean) => handleChange(amenity.label, value)}
                value={checkedValues[amenity.label] || false} // Use checkedValues state
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
