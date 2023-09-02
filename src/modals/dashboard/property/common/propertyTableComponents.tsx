import PrIconV2 from "@/components/common/PrIcon/PrIconV2";
import PrMapComponent from "@/components/common/PrMapComponent/PrMapComponent";
import { TableCellPropsT } from "@/components/common/PrTable/PrTableCommon";
import ToggleSwitch from "./toggleSwitchProperty";
import router from "next/router";

export const AddressCell:React.FC<TableCellPropsT> = (props) =>{
    return(
        <div className='text-black'>{props.data.addressLine1+props.data.addressLine2}</div>
    );
}

export const AvilableCell:React.FC<TableCellPropsT>=(props)=>{
    return(
        <div className='w-32 h-12'>
             <ToggleSwitch initialState={props.data} ></ToggleSwitch>
        </div>
    );
}

export const GpsLocationCell:React.FC<TableCellPropsT>=(props)=>{
    return(
        <PrMapComponent latitude={props?.data?.latitude} longitude={props?.data?.longitude} className={'w-20 h-20'}></PrMapComponent>
    );
}

const handleView=(id:string)=>{
    
}
const handleEdit=(id:string)=>{
    router.push(`/dashboard/editproperty/${id}`);
}
const handleDelete=(id:string)=>{
    
}

export const ActionCell:React.FC<TableCellPropsT>=(props)=>{
    console.log(props)
    return(
        <div className='flex space-x-2'>
            <PrIconV2 name={'RemoveRedEyeSharp'} color='blue' onClick={()=>handleView(props?.rowData?.propertyID)} ></PrIconV2>
            <PrIconV2 name={'Edit'} color='blue' onClick={()=>handleEdit(props?.rowData?.id)}></PrIconV2>
            <PrIconV2 name={'Delete'} color='blue' onClick={()=>handleDelete(props?.rowData?.propertyID)}></PrIconV2>
        </div>
    );
}