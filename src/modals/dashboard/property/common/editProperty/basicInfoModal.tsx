import React, { useState } from 'react';
import { H1 } from "@/components/common/Header/header";
import PrInputField from "@/components/common/PrInputField/PrInputField";
import { PrPhoneNumberInputField } from "@/components/common/PrPhoneNumberInputField/PrPhoneNumberInputField";
import { CountryIso2 } from "react-international-phone";
import PrInputFieldV2 from '@/components/common/PrInputField/PrInputFieldV2';
import { PrCountryInputField } from '@/components/common/PrCountryInputField/PrCountryInputField';
import PrMapComponent from '@/components/common/PrMapComponent/PrMapComponent';
import PrButton from '@/components/common/PrButton/PrButton';
import PrButtonV2 from '@/components/common/PrButton/PrButtonV2';
import { usePropertyData } from '@/redux';

function BasicInfoModal(){
    const [phoneNumber1, setPhoneNumber1] = useState("");
    const [phoneNumber2, setPhoneNumber2] = useState("");
    const data=usePropertyData();
    console.log(data)
    const handlePhoneNumberChange1 = (phone: string, country: CountryIso2) => {
        setPhoneNumber1(phone);
        // You can perform additional actions here if needed
    };

    const handlePhoneNumberChange2 = (phone: string, country: CountryIso2) => {
        setPhoneNumber2(phone);
        // You can perform additional actions here if needed
    };

    return (
        <div className='overflow-auto flex flex-col space-x-4 '>
            <div className='mb-4 p-4'>
                <H1 className="text-[1.8rem]">Contact Info</H1>
                <div className="grid grid-cols-2 gap-4">
                    <PrInputField className="w-[90%]" label={"Property Name"} />
                    <PrInputField className="w-[90%]" label={"Contact Person"} />
                    <PrPhoneNumberInputField value={phoneNumber1} onChange={handlePhoneNumberChange1} label={'Primary Contact Number'}  />
                    <PrPhoneNumberInputField value={phoneNumber2} onChange={handlePhoneNumberChange2} label={'Secondary Contact Number'} />
                </div>
            </div>
            <div>
                <H1 className="text-[1.8rem]">Location Info</H1>
                <div className="grid grid-cols-2 gap-4">
                <PrInputFieldV2  className="w-[80%]" label={'Address Line 1'}></PrInputFieldV2>
                <PrInputFieldV2 className='w-[80%]' label={'Pin/Zip Code/Postal Code'}></PrInputFieldV2>
                <PrInputFieldV2 className='w-[80%]' label={'Address line 2'}></PrInputFieldV2>
                <PrCountryInputField className='border-b w-[80%]' value={''} onChange={function (newValue: string): void {
              throw new Error('Function not implemented.');
            } }></PrCountryInputField>

                </div>
                <PrInputFieldV2 className='w-[40%]' label={'City/Town'}></PrInputFieldV2>
                <PrInputFieldV2 className='w-[40%]' label={'State/Province/Region'}></PrInputFieldV2>

            </div>
        <div >
        <H1 className="text-[1.8rem]">GPS Location</H1>
        <div className='w-full h-[400px]'>
          <PrMapComponent latitude={0} longitude={0} className='w-full h-full'></PrMapComponent>
        </div>
        <div className='mb-64 mt-8 mx-auto max-w-[50%] space-y-6'>
  <H1 className="text-[1.8rem] text-center">Admin User</H1>

  <div>
    <PrInputField className="w-full" label={'User Name'}></PrInputField>
    <PrInputField className="w-full" label={'Create New Password'}></PrInputField>
    <PrInputField className="w-full" label={'Confirm New Password'}></PrInputField>
  </div>

  <div className='w-1/2 mx-auto flex justify-between'>
    <PrButtonV2 label={'Save'} className='w-40 rounded-md'></PrButtonV2>
    <PrButtonV2 label={'Cancel'} dangerLink buttonStyle='danger' className='w-40 rounded-md'></PrButtonV2>
  </div>
</div>



      </div>
        </div>
    );
}

export default BasicInfoModal;
