import Image from 'next/image';
import Nodata from '../../../assets/common/nodatafound.svg';

function NoDataFound() {
  return (
    <div className='mx-auto p-10'>
      <div className='flex flex-row justify-center items-center'>
        <Image src={Nodata} alt={'nodata'} width={250} height={250}></Image>
      </div>

      <div className='text-[24px] mt-4 font-bold text-blue-800 flex flex-row justify-center items-center'>{`No Data Found`}</div>
    </div>
  );
}

export default NoDataFound;
