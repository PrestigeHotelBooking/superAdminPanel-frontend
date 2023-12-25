import React, { useEffect, useState } from 'react';
import PrIcon from '@/components/common/PrIcon/PrIcon';
import PrButtonV2 from '@/components/common/PrButton/PrButtonV2';
import { BackendPostV2 } from '@/components/services/BackendServicesV2';
import { ENDPOINTS } from '@/components/lang/EndPoints';
import useRoomDataHook from '@/hooks/useRoomDataHook/useRoomDataHook';
import PhotoCollopser from '../components/photoCollpaser';
import Image from 'next/image';
import { toast } from 'react-toastify';

export interface imageObjectT {
  dataURL: string;
  originalName: string;
  mimeType: string;
  create: boolean;
}

function PhotosModal({ id }: { id: string }) {
  const { data, loading } = useRoomDataHook(id);

  const [selectedImages_property, setSelectedImagesProperty] = useState<imageObjectT[]>([]);

  useEffect(() => {
    if (data) {
      const updatedSelectedImages: { [roomId: number]: imageObjectT[] } = {};
      data.forEach((d) => {
        const newImages: imageObjectT[] = d?.room_image_urls ? JSON?.parse(d?.room_image_urls)?.map((imageUrl: any) => ({
          dataURL: imageUrl,
          originalName: '',
          mimeType: '',
          create: false,
        })) : [];
        updatedSelectedImages[d.room_id] = newImages;
      });
      setSelectedImagesRoom((prevImages) => ({
        ...prevImages,
        ...updatedSelectedImages,
      }));
    }
  }, [data]);

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
              newImages.push({ dataURL, originalName, mimeType, create: true }); // Store dataURL, originalName, and mimeType
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

  const [selectedImagesRoom, setSelectedImagesRoom] = useState<{
    [roomId: number]: imageObjectT[];
  }>({});

  const handleFileChangeRoom = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const files = event.target.files;
    if (files) {
      const newImages: imageObjectT[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              const dataURL = event.target.result as string;
              const originalName = file.name;
              const mimeType = file.type;

              newImages.push({ dataURL, originalName, mimeType, create: true });

              if (i === files.length - 1) {
                setSelectedImagesRoom((prevImages) => ({
                  ...prevImages,
                  [id]: [...(prevImages[id] || []), ...newImages],
                }));
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
    formData.append('type', 'room');
    formData.append('images', JSON.stringify(selectedImagesRoom));
    const data = await BackendPostV2(ENDPOINTS.PROPERTY.ADD_IMAGES, formData);
    if (data.success) {
      toast.success(`Image has been  updated successfully..........! `);
    } else {
      toast.error(`Unable to update the image `);
    }
  };

  const sections = loading
    ? []
    : data?.map((room, id) => {
        return {
          index: id,
          title: room.room_Name,
          content: (
            <div className='flex flex-wrap mt-5'>
              {selectedImagesRoom[room.room_id]?.map((image, index) => (
                <div
                  key={index}
                  className={`w-[10rem] h-[10rem] border-dotted border-2 border-gray-300 rounded-lg mr-4 mb-4 ${
                    index % 5 === 4 ? 'mr-3' : ''
                  }`}
                >
                  <Image src={image?.dataURL} alt={'image=data'} width={100} height={100}></Image>
                </div>
              ))}
              <div
                className={`w-[10rem] h-[10rem] border-dotted border-2 border-gray-300 rounded-lg mr-4 mb-4 ${
                  selectedImagesRoom[room.room_id]?.length % 5 === 4 ? 'mr-0' : ''
                }`}
              >
                <label
                  htmlFor={`dropzone-file-room-${room.room_id}`}
                  className='flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover-bg-gray-100 dark-border-gray-600 dark-hover-border-gray-500 dark-hover-bg-gray-600'
                >
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <PrIcon name={'Upload'} size={28} />
                  </div>
                  <input
                    id={`dropzone-file-room-${room.room_id}`}
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={(e) => handleFileChangeRoom(e, room.room_id)}
                    multiple // Enable multi-image selection
                  />
                </label>
              </div>
            </div>
          ),
        };
      });

  return (
    <div className='mb-64'>
      {/* Property Photos */}
      <div className='font-semibold text-gray-500 text-[18px] p-2'>Property Photos</div>
      <div className='flex flex-wrap mt-5'>
        {selectedImages_property.map((image, index) => (
          <div
            key={index}
            className={`w-[10rem] h-[10rem] border-dotted border-2 border-gray-300 rounded-lg mr-4 mb-4 ${
              index % 5 === 4 ? 'mr-3' : ''
            }`}
          >
            <div className='flex flex-col items-center justify-center w-full h-full'>
              <img src={image.dataURL} alt={`Uploaded ${index + 1}`} className='max-h-full max-w-full' />
            </div>
          </div>
        ))}
        <div
          className={`w-[10rem] h-[10rem] border-dotted border-2 border-gray-300 rounded-lg mr-4 mb-4 ${
            selectedImages_property.length % 5 === 4 ? 'mr-0' : ''
          }`}
        >
          <label
            htmlFor='dropzone-file-property'
            className='flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 '
          >
            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
              <PrIcon name={'Upload'} size={28} />
            </div>
            <input
              id='dropzone-file-property'
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleFileChange}
              multiple
            />
          </label>
        </div>
      </div>

      <div className='font-semibold text-gray-500 text-[18px] p-2'>Room Photos</div>

      <PhotoCollopser sections={sections}></PhotoCollopser>

      <div className='flex mt-12 space-x-16 justify-center'>
        <PrButtonV2 label={'Save'} className='rounded-md' onClick={saveMe} />
        <PrButtonV2 label={'Cancel'} className='rounded-md' dangerLink buttonStyle='danger' />
      </div>
    </div>
  );
}

export default PhotosModal;
