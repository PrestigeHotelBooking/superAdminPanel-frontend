import PrButtonV2 from "@/components/common/PrButton/PrButtonV2";
import PrIcon from "@/components/common/PrIcon/PrIcon";
import PrInputField from "@/components/common/PrInputField/PrInputField";
import PrTextArea from "@/components/common/PrTextArea/PrTextArea";
import { ChangeEvent, Fragment, useState } from "react";
import { imageObjectT } from "../property/common/editProperty/photosModal";
import React from 'react';
import { BackendPostV2 } from "@/components/services/BackendServicesV2";
import { ENDPOINTS } from "@/components/lang/EndPoints";
import { toast } from "react-toastify";
import Image from "next/image";
import PrButton from "@/components/common/PrButton/PrButton";

interface addContentModalDataT {
  contentTitle: string;
  contentDescription: string;
  contentImage: imageObjectT |null ;
}

const initialAddContentModalData: addContentModalDataT = {
  contentTitle: '',
  contentDescription: '',
  contentImage: {
    dataURL: '',
    originalName: '',
    mimeType: ''
  }
};

interface AddContentModalProps {
  handleModal: () => void;
}

function AddContentModal(props: AddContentModalProps) {

  const [addContentModalData, setAddContentModalData] = useState<addContentModalDataT>(initialAddContentModalData);
  const [addLoading,setAddLoading]=useState(false);
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataURL = e.target?.result as string;

        setAddContentModalData((prevData) => ({
          ...prevData,
          contentImage: {
            dataURL,
            originalName: file.name,
            mimeType: file.type
          }
        }));
      };

      reader.readAsDataURL(file);
    }

  };

  const handleState = (data: Partial<addContentModalDataT>) => {
    setAddContentModalData({
      ...addContentModalData,
      ...data
    })
  }


  const addToDatabase = async () => {
    setAddLoading(!addLoading)
    const formData = new FormData();
    formData.append('title', addContentModalData.contentTitle);
    formData.append('content', addContentModalData?.contentDescription);
    formData.append('images', JSON.stringify(addContentModalData?.contentImage));

    const data = await BackendPostV2(`${ENDPOINTS.CONTENT.ADD}`, formData);
    if (data.success) {
      toast.success(`Data has been added successfully/....`);
      setAddLoading(!addLoading)
      props.handleModal();
    } else {
      toast.error(`Unable to add some data`);
      setAddLoading(!addLoading)
    }
    
  }




  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white w-[40%] p-8 rounded-lg shadow-lg">
        <div className='flex items-center justify-between border-b border-black mb-4'>
          <h2 className="text-xl font-semibold mb-4">Add Content</h2>
          <PrIcon onClick={props.handleModal} className='hover:cursor-pointer' name={'X'}></PrIcon>
        </div>
        <PrInputField label={"Title"} className="w-full" value={addContentModalData?.contentTitle}
          onChange={(e) => {
            handleState({ contentTitle: e.target.value })
          }}
        ></PrInputField>
        <PrTextArea label={"Content"} value={addContentModalData.contentDescription} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => { handleState({ contentDescription: e.target.value }) }} />
        <div className={`w-full h-[15rem] border-dotted border-2 border-gray-300 rounded-lg mr-4 mb-4`}>

          {(addContentModalData?.contentImage as imageObjectT)?.dataURL ? (
            <div className="w-full h-full flex flex-col space-y-4 ">
                <Image src={(addContentModalData?.contentImage as imageObjectT)?.dataURL} width={100} height={100} alt="Selected"  className="w-full h-full"/>
                <PrButton buttonStyle='danger' onClick={()=>{ handleState({ contentImage:null }) } }  className="rounded-md" label={"Reset Image"}/>
            </div>

          ) : (
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">

                <PrIcon name={'Upload'} size={28} />

              </div>
              <input id="dropzone-file" type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </label>
          )}

        </div>
        <div className="flex justify-center">
          <PrButtonV2 label={addLoading ? 'Adding' :'Add'} loading={addLoading} buttonStyle='danger' className="rounded-md " onClick={addToDatabase}></PrButtonV2>
        </div>
      </div>
    </div>
  );
}

export default AddContentModal;
