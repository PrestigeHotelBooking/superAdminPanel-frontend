import React, { useState } from 'react';
import PrIcon from "@/components/common/PrIcon/PrIcon";
import PrButtonV2 from '@/components/common/PrButton/PrButtonV2';
import { BackendPost } from '@/components/services/BackendServices';
import { API_ENDPOINT } from '@/Global/api/api';
import { ENDPOINTS } from '@/components/lang/EndPoints';
import { BackendPostV2 } from '@/components/services/BackendServicesV2';

function PhotosModal(){
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImages((prevImages) => [...prevImages, event?.target?.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const saveMe = async () => {
    const formData = new FormData();
    selectedImages.forEach((image, index) => {
      formData.append(`image_${index}`, image);
    });
    formData.append('type','rooms');
    try {
      const data = await BackendPostV2(`${ENDPOINTS.PROPERTY.ADD_IMAGES}`, formData);
      console.log(data);
      console.log(selectedImages);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };
  

  const imagesInRow = 5; // Number of images in a row

  return (
    <div className="mb-64">
            <div className='font-semibold text-gray-500  text-[18px] p-2'>Property Photos</div>
      <div className="flex flex-wrap mt-5">
  
        {selectedImages.map((image, index) => (
          <div key={index} className={`w-[10rem] h-[10rem] border-dotted border-2 border-gray-300 rounded-lg mr-4 mb-4 ${index % imagesInRow === imagesInRow - 1 ? 'mr-3' : ''}`}>
            <div className="flex flex-col items-center justify-center w-full h-full">
              <img src={image} alt={`Uploaded ${index + 1}`} className="max-h-full max-w-full" />
            </div>
          </div>
        ))}
        <div className={`w-[10rem] h-[10rem] border-dotted border-2 border-gray-300 rounded-lg mr-4 mb-4 ${selectedImages.length % imagesInRow === imagesInRow - 1 ? 'mr-0' : ''}`}>
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <PrIcon name={'Upload'} size={28} />
            </div>
            <input id="dropzone-file" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      </div>
      <div className='font-semibold text-gray-500  text-[18px] p-2'>Room Photos</div>
      <div className="flex flex-wrap mt-5">
  
        {selectedImages.map((image, index) => (
          <div key={index} className={`w-[10rem] h-[10rem] border-dotted border-2 border-gray-300 rounded-lg mr-4 mb-4 ${index % imagesInRow === imagesInRow - 1 ? 'mr-3' : ''}`}>
            <div className="flex flex-col items-center justify-center w-full h-full">
              <img src={image} alt={`Uploaded ${index + 1}`} className="max-h-full max-w-full" />
            </div>
          </div>
        ))}
        <div className={`w-[10rem] h-[10rem] border-dotted border-2 border-gray-300 rounded-lg mr-4 mb-4 ${selectedImages.length % imagesInRow === imagesInRow - 1 ? 'mr-0' : ''}`}>
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <PrIcon name={'Upload'} size={28} />
            </div>
            <input id="dropzone-file" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
        
      </div>
      <div className="flex mt-12 space-x-16 justify-center">
        <PrButtonV2 label={"Save"} className="rounded-md" onClick={saveMe} />
        <PrButtonV2 label={"Cancel"} className="rounded-md" dangerLink buttonStyle='danger' />
      </div>
    </div>
  );
}

export default PhotosModal;
