import React, { useState } from 'react';
import PrIcon from '@/components/common/PrIcon/PrIcon';
import PrButtonV2 from '@/components/common/PrButton/PrButtonV2';
import { BackendPostV2 } from '@/components/services/BackendServicesV2';
import { ENDPOINTS } from '@/components/lang/EndPoints';
import { ConvertBase64ToFullFileObject } from '@/components/services/MulterConverter';


interface imageObjectT {
  dataURL: string;
  originalName: string;
  mimeType: string;
}

function PhotosModal({ id }: { id: string }) {
 

  const [selectedImages_property, setSelectedImagesProperty] = useState<imageObjectT[]>([]);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: imageObjectT[] = []; // Use an object to store dataURL, originalName, and mimeType
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              const dataURL = event.target.result as string;
              const originalName = file.name;
              const mimeType = file.type; // Get the MIME type
              newImages.push({ dataURL, originalName, mimeType }); // Store dataURL, originalName, and mimeType
              if (i === files.length - 1) {
                setSelectedImagesProperty((prevImages) => [...prevImages, ...newImages]);
              }
            }
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };
  

  const [selectedImages_room, setSelectedImagesRoom] = useState<string[]>([]);


  
  const handleFileChangeRoom = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              newImages.push(event.target.result as string);
              if (i === files.length - 1) {
                setSelectedImagesRoom((prevImages) => [...prevImages, ...newImages]);
              }
            }
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };

  const saveMe = async () => {
const formData = new FormData();
formData.append('propertyID', id);
formData.append('type', 'property');
formData.append('caption', 'Room Images');
formData.append('images',JSON.stringify(selectedImages_property))
const data = await BackendPostV2(ENDPOINTS.PROPERTY.ADD_IMAGES,formData);
console.log(data);
};

  return (
    <div className="mb-64">
      {/* Property Photos */}
      <div className="font-semibold text-gray-500 text-[18px] p-2">Property Photos</div>
      <div className="flex flex-wrap mt-5">
        {selectedImages_property.map((image, index) => (
          <div
            key={index}
            className={`w-[10rem] h-[10rem] border-dotted border-2 border-gray-300 rounded-lg mr-4 mb-4 ${
              index % 5 === 4 ? 'mr-3' : ''
            }`}
          >
            <div className="flex flex-col items-center justify-center w-full h-full">
              <img src={image.dataURL} alt={`Uploaded ${index + 1}`} className="max-h-full max-w-full" />
            </div>
          </div>
        ))}
        <div
          className={`w-[10rem] h-[10rem] border-dotted border-2 border-gray-300 rounded-lg mr-4 mb-4 ${
            selectedImages_property.length % 5 === 4 ? 'mr-0' : ''
          }`}
        >
          <label
            htmlFor="dropzone-file-property"
            className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <PrIcon name={'Upload'} size={28} />
            </div>
            <input
              id="dropzone-file-property"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              multiple // Enable multi-image selection
            />
          </label>
        </div>
      </div>

      {/* Room Photos */}
      <div className="font-semibold text-gray-500 text-[18px] p-2">Room Photos</div>
      <div className="flex flex-wrap mt-5">
        {selectedImages_room.map((image, index) => (
          <div
            key={index}
            className={`w-[10rem] h-[10rem] border-dotted border-2 border-gray-300 rounded-lg mr-4 mb-4 ${
              index % 5 === 4 ? 'mr-3' : ''
            }`}
          >
            <div className="flex flex-col items-center justify-center w-full h-full">
              <img src={image} alt={`Uploaded ${index + 1}`} className="max-h-full max-w-full" />
            </div>
          </div>
        ))}
        <div
          className={`w-[10rem] h-[10rem] border-dotted border-2 border-gray-300 rounded-lg mr-4 mb-4 ${
            selectedImages_room.length % 5 === 4 ? 'mr-0' : ''
          }`}
        >
          <label
            htmlFor="dropzone-file-room"
            className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <PrIcon name={'Upload'} size={28} />
            </div>
            <input
              id="dropzone-file-room"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChangeRoom}
              multiple // Enable multi-image selection
            />
          </label>
        </div>
      </div>

      <div className="flex mt-12 space-x-16 justify-center">
        <PrButtonV2 label={'Save'} className="rounded-md" onClick={saveMe} />
        <PrButtonV2 label={'Cancel'} className="rounded-md" dangerLink buttonStyle="danger" />
      </div>
    </div>
  );
}

export default PhotosModal;
