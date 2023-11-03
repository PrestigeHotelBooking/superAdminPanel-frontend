import { H1 } from "@/components/common/Header/header";
import PrButtonV2 from "@/components/common/PrButton/PrButtonV2";
import PrInputField from "@/components/common/PrInputField/PrInputField";
import { ENDPOINTS } from "@/components/lang/EndPoints";
import { BackendPatch } from "@/components/services/BackendServices";
import usePropertySingle from "@/hooks/useProperty/usePropertySingle";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


interface financeModalT{
    accountHolderName:string;
    accountNumber:string;
    ifscCode:string;
    bankName:string;
    panNumber:string;
    gstNumber:string;
}

const initialFinanceModal :financeModalT={
    accountHolderName:'',
    accountNumber:'',
    ifscCode:'',
    bankName:'',
    panNumber:'',
    gstNumber:''
}

function FinanceModal({ id }: { id: string }){
    const {data}=usePropertySingle(id);
    const [financeModalData,setFinaceModalData]=useState<financeModalT>(initialFinanceModal);

    useEffect(()=>{
        handleState({ 
            accountHolderName:data?.propertyuser_accountHolderName || '',
            accountNumber:data?.propertyuser_accountNo || '',
            bankName:data?.propertyuser_bankName || '',
            gstNumber:data?.propertyuser_gstNumber || '',
            panNumber:data?.propertyuser_panDetail || '', 
            ifscCode:data?.propertyuser_ifscCode || ''
         })
    },[data]);

    const handleState = (data:Partial<financeModalT>) =>{
        setFinaceModalData((prevState)=>({
            ...prevState,
            ...data
        }));
    }

    const financeModalUpdate=async ()=>{
        const data={
            "updateData":[{
                propertyuser_accountHolderName:financeModalData?.accountHolderName,
                propertyuser_accountNo:financeModalData?.accountNumber,
                propertyuser_bankName:financeModalData?.bankName,
                propertyuser_gstNumber:financeModalData?.gstNumber,
                propertyuser_panDetail:financeModalData?.panNumber,
                propertyuser_ifscCode:financeModalData?.ifscCode
            }]
        }
        const update=await BackendPatch(`${ENDPOINTS.PROPERTY.UPDATE}/${id}`,data);
        if(update?.success){
            toast.success(`update the finance modal data`);
        }
        else{
            toast.error(`unable to update the finance modal`)
        }
    }

    return(
        <div className='overflow-auto flex flex-col space-x-4 mb-64'>
        <div className='mb-4 p-4'>
            <H1 className="text-[1.8rem]">Contact Info</H1>
            <div className="grid grid-cols-2 gap-4">
                <PrInputField className="w-[90%]" label={"Account Holder Name"} value={financeModalData.accountHolderName} onChange={(e)=>{ handleState({ accountHolderName:e.target.value }) }}  />
                <PrInputField className="w-[90%]" label={"Account No"}  value={financeModalData.accountNumber} onChange={(e)=>{ handleState({ accountNumber:e.target.value }) }} />
                <PrInputField className="w-[90%]" label={"IFSC Code"}  value={financeModalData.ifscCode} onChange={(e)=>{ handleState({ ifscCode:e.target.value }) }}/>
                <PrInputField className="w-[90%]" label={"Bank Name"} value={financeModalData.bankName} onChange={(e)=>{ handleState({ bankName:e.target.value }) }} />
                
            </div>
        </div>
        <div className='mb-4   flex'>
            <div className="w-full">
            <H1 className="text-[1.8rem]">PAN Detail</H1>
            <PrInputField className="w-[90%]" label={"Pan Number"} value={financeModalData.panNumber} onChange={(e)=>{ handleState({ panNumber:e.target.value }) }} />    
            </div>
            <div className="w-full">
            <H1 className="text-[1.8rem]">GST Number</H1>
                <PrInputField className="w-[90%]" label={"GST Number"} value={financeModalData.gstNumber} onChange={(e)=>{ handleState({ gstNumber:e.target.value }) }} />
            </div>
        </div>
    
                <div style={{ margin:'auto' }} className="w-1/4 flex flex-col items-center justify-center">
        <div className="flex justify-between w-full">
            <PrButtonV2 label={'Save'} className='w-40 rounded-md' onClick={financeModalUpdate}></PrButtonV2>
            <PrButtonV2 label={'Cancel'} dangerLink buttonStyle='danger' className='w-40 rounded-md'></PrButtonV2>
        </div>
        </div>



    </div>
    );
}
export default FinanceModal;