import React, { useEffect, useMemo, useState } from 'react';
import { H1 } from "@/components/common/Header/header";
import PrInputField from "@/components/common/PrInputField/PrInputField";
import { PrPhoneNumberInputField } from "@/components/common/PrPhoneNumberInputField/PrPhoneNumberInputField";
import { CountryIso2 } from "react-international-phone";
import PrInputFieldV2 from '@/components/common/PrInputField/PrInputFieldV2';
import { PrCountryInputField } from '@/components/common/PrCountryInputField/PrCountryInputField';
import PrMapComponent from '@/components/common/PrMapComponent/PrMapComponent';
import PrButtonV2 from '@/components/common/PrButton/PrButtonV2';
import { basicInfoT, initialBasicInfo } from './helper';
import usePropertySingle from '@/hooks/useProperty/usePropertySingle';
import { BackendPatch } from '@/components/services/BackendServices';
import { ENDPOINTS } from '@/components/lang/EndPoints';
import { toast } from 'react-toastify';


function BasicInfoModal({ id }: { id: string }){
    
    const {data} =usePropertySingle(id);
  
    useEffect(()=>{
          handleState({
            propertyName:data?.property_name ||' ',
            addressLine1:data?.property_addressLine1 || ' ',
            addressLine2:data?.property_addressLine2 || '',
            city:data?.property_city || '',
            latitude:data?.property_latitude,
            longitude:data?.property_longitude,
            state:data?.property_state || '',
            primaryContactNumber:data?.property_primaryphone_number,
            secondaryContactNumber:data?.property_secondaryphone_number,
            pinCode:data?.property_pincode || '',
            country:data?.property_country,
            userName:data?.propertyuser_username || '',
            newPassword:data?.propertyuser_password || '',
            confirmNewPassword:data?.propertyuser_password || ''
          })
    },[data])

    const [basicInfoData,SetBasicInfoData]=useState<basicInfoT>(initialBasicInfo);


    const handleState = (data: Partial<basicInfoT>) => {
      SetBasicInfoData((prevData) => ({
        ...prevData, 
        ...data, 
      }));
    }

    const mapProps = useMemo(() => {
      return {
        initialLatitude: basicInfoData?.latitude || 0, // Use a default value if data is not available
        initialLongitude: basicInfoData?.longitude || 0, // Use a default value if data is not available
        className: 'w-full h-full',
        onMapDrag: (lat:any,long:any) => {
          handleState({
            latitude:lat,
            longitude:long
                    })
         },
      };
    }, [basicInfoData?.latitude, basicInfoData?.longitude]);

    console.log(mapProps)

    const updateTheBasicInfo = async () =>{
      const data={
        "updateData":[{
          property_name:basicInfoData.propertyName,
          property_addressLine1:basicInfoData.addressLine1,
          property_addressLine2:basicInfoData.addressLine2,
          property_city:basicInfoData.city,
          property_latitude:basicInfoData.latitude,
          property_longitude:basicInfoData.longitude,
          property_state:basicInfoData.state,
          property_primaryphone_number:basicInfoData.primaryContactNumber,
          property_secondaryphone_number:basicInfoData.secondaryContactNumber,
          property_pincode:basicInfoData.pinCode,
          property_country:basicInfoData.country,
          propertyuser_username:basicInfoData.userName,
          propertyuser_password:basicInfoData.newPassword
        }]
      }
      const update=await BackendPatch(`${ENDPOINTS.PROPERTY.UPDATE}/${id}`,data);
      if(update.success){
        toast.success(`Updated the property successfully`)
      }
      else{
        toast.error(`Unable to update the property`)
      }
    }


     
    return (
        <div className='overflow-auto flex flex-col space-x-4 '>
            <div className='mb-4 p-4'>
                <H1 className="text-[1.8rem]">Contact Info</H1>
                <div className="grid grid-cols-2 gap-4">
                    <PrInputField className="w-[90%]" value={basicInfoData?.propertyName} label={"Property Name"} onChange={(e)=>{ handleState({ propertyName:e.target.value }) }} />
                    <PrInputField className="w-[90%]" value={basicInfoData?.contactPerson} label={"Contact Person"} onChange={(e)=>{ handleState({ contactPerson:e.target.value }) }} />
                    <PrPhoneNumberInputField value={basicInfoData?.primaryContactNumber} onChange={(phone: string, country: CountryIso2)=>{handleState({ primaryContactNumber:phone })}} label={'Primary Contact Number'}  />
                    <PrPhoneNumberInputField value={basicInfoData?.secondaryContactNumber} onChange={(phone: string, country: CountryIso2)=>{handleState({ secondaryContactNumber:phone }) }} label={'Secondary Contact Number'} />
                </div>
            </div>
            <div>
                <H1 className="text-[1.8rem]">Location Info</H1>
                <div className="grid grid-cols-2 gap-4">
                <PrInputFieldV2  className="w-[80%]" value={basicInfoData?.addressLine1} label={'Address Line 1'} onChange={(e)=>{ handleState({ addressLine1:e.target.value }) } }></PrInputFieldV2>
                <PrInputFieldV2 className='w-[80%]' label={'Pin/Zip Code/Postal Code'} value={basicInfoData?.pinCode} onChange={(e)=>{handleState({ pinCode:e.target.value }) }}></PrInputFieldV2>
                <PrInputFieldV2 className='w-[80%]' label={'Address line 2'} value={basicInfoData?.addressLine2}  onChange={(e)=>{handleState({ addressLine2:e.target.value }) }}></PrInputFieldV2>
                <PrCountryInputField className='border-b w-[80%]' value={basicInfoData?.country} onChange={()=>{} }></PrCountryInputField>

                </div>
                <PrInputFieldV2 className='w-[40%]' label={'City/Town'} value={basicInfoData?.city} onChange={(e)=>{handleState({ city:e.target.value }) }}></PrInputFieldV2>
                <PrInputFieldV2 className='w-[40%]' label={'State/Province/Region'} value={basicInfoData?.state} onChange={(e)=>{handleState({ state:e.target.value }) }}></PrInputFieldV2>

            </div>
        <div >
        <H1 className="text-[1.8rem]">GPS Location</H1>
        <div className='w-full h-[400px]'>
          <PrMapComponent {...mapProps}></PrMapComponent>
        </div>
        <div className='mb-64 mt-8 mx-auto max-w-[50%] space-y-6'>
        <H1 className="text-[1.8rem] text-center">Admin User</H1>

        <div>
          <PrInputField className="w-full" label={'User Name'} value={basicInfoData?.userName} onChange={(e)=>{handleState({ userName:e.target.value }) }}></PrInputField>
          <PrInputField className="w-full" label={'Create New Password'} value={basicInfoData?.newPassword} onChange={(e)=>{handleState({ newPassword:e.target.value }) }}></PrInputField>
          <PrInputField className="w-full" label={'Confirm New Password'} value={basicInfoData?.confirmNewPassword} onChange={(e)=>{handleState({ confirmNewPassword:e.target.value }) }}></PrInputField>
        </div>

        <div className='w-1/2 mx-auto flex justify-between'>
          <PrButtonV2 label={'Save'} className='w-40 rounded-md' onClick={updateTheBasicInfo}></PrButtonV2>
          <PrButtonV2 label={'Cancel'} dangerLink buttonStyle='danger' className='w-40 rounded-md'></PrButtonV2>
        </div>
      </div>



      </div>
        </div>
    );
}

export default BasicInfoModal;
