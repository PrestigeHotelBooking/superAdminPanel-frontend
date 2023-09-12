import { H1 } from "@/components/common/Header/header";
import PrButtonV2 from "@/components/common/PrButton/PrButtonV2";
import PrInputField from "@/components/common/PrInputField/PrInputField";


function FinanceModal({ id }: { id: string }){
    return(
        <div className='overflow-auto flex flex-col space-x-4 mb-64'>
        <div className='mb-4 p-4'>
            <H1 className="text-[1.8rem]">Contact Info</H1>
            <div className="grid grid-cols-2 gap-4">
                <PrInputField className="w-[90%]" label={"Account Holder Name"} />
                <PrInputField className="w-[90%]" label={"Account No"} />
                <PrInputField className="w-[90%]" label={"IFSC Code"} />
                <PrInputField className="w-[90%]" label={"Bank Name"} />
                
            </div>
        </div>
        <div className='mb-4   flex'>
            <div className="w-full">
            <H1 className="text-[1.8rem]">PAN Detail</H1>
            <PrInputField className="w-[90%]" label={"Pan Number"} />    
            </div>
            <div className="w-full">
            <H1 className="text-[1.8rem]">GST Number</H1>
                <PrInputField className="w-[90%]" label={"GST Number"} />
            </div>
        </div>
    
        <div style={{ margin:'auto' }} className="w-1/4 flex flex-col items-center justify-center">
  <div className="flex justify-between w-full">
    <PrButtonV2 label={'Save'} className='w-40 rounded-md'></PrButtonV2>
    <PrButtonV2 label={'Cancel'} dangerLink buttonStyle='danger' className='w-40 rounded-md'></PrButtonV2>
  </div>
</div>



    </div>
    );
}
export default FinanceModal;