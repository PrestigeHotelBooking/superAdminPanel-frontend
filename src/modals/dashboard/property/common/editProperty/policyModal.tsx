import PrButtonV2 from "@/components/common/PrButton/PrButtonV2";
import PrTextArea from "@/components/common/PrTextArea/PrTextArea";

function PolicyModal({ id }: { id: string }){
    return(
        <div className="mb-64">
            <PrTextArea label={"General Policy"}></PrTextArea>
            <PrTextArea label={`Cancellation Policy`}></PrTextArea>
            <PrTextArea label={`Payment Policy`}></PrTextArea>
            <div  className='w-1/4 mx-auto flex justify-between'>
    <PrButtonV2 label={'Save'} className='w-40 rounded-md'></PrButtonV2>
    <PrButtonV2 label={'Cancel'} dangerLink buttonStyle='danger' className='w-40 rounded-md'></PrButtonV2>
  </div>
        </div>
    );
}
export default PolicyModal;