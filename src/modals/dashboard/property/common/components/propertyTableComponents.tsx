import 'react-toastify/dist/ReactToastify.css';
import { TableCellPropsT } from '@/components/common/PrTable/PrTableCommon';
import ToggleSwitch from './toggleSwitchProperty';
import router from 'next/router';
import Image from 'next/image';
import MapImage from '../../../../../assets/Property/Map_Image.png';
import { BackendPatch, BackendPost } from '@/components/services/BackendServices';
import { ENDPOINTS } from '@/components/lang/EndPoints';
import { toast } from 'react-toastify';
export const AddressCell: React.FC<TableCellPropsT> = (props) => {
  return <div className='text-black'>{props.data.addressLine1 + ' \n' + props.data.addressLine2}</div>;
};

const updateTheAvilableStatus = async (active: boolean, rowId: string) => {
  const updateData = [{ available: active ? 1 : 0 }];

  const updateStatus = await BackendPatch(`${ENDPOINTS.PROPERTY.UPDATE}/${rowId}`, { updateData: updateData });
  if (updateStatus.success) {
    toast.success('update the avilable successfully', {});
  } else {
    toast.error('Unable to update the property', {});
  }
};

export const AvilableCell: React.FC<TableCellPropsT> = (props) => {
  return (
    <div className='w-32 h-12'>
      <ToggleSwitch
        initialState={props?.rowData?.available}
        handleSwitch={(active: boolean) => updateTheAvilableStatus(active, props?.rowData?.property_id)}
      ></ToggleSwitch>
    </div>
  );
};

export const GpsLocationCell: React.FC<TableCellPropsT> = (props) => {
  return (
    <div>
      <Image alt='Map' src={MapImage}></Image>
    </div>
  );
};

export const handleView = (id: string) => {};
export const handleEdit = (id: string) => {
  router.push(`/dashboard/editproperty/${id}`);
};
