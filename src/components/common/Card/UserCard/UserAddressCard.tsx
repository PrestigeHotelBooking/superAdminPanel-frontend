import React from 'react';
import PrIconV2, { MaterialIconsType } from '../../PrIcon/PrIconV2';

interface UserAddressCardProps {
  icon: MaterialIconsType;
  title: string;
  subtitle: string;
  items: {
    title: string;
    subtitle: string;
  }[];
}

const UserAddressCard: React.FC<UserAddressCardProps> = ({ icon, title, subtitle, items }) => {
  return (
    <div className='bg-white p-4 rounded-md w-full shadow-md'>
      <div className='flex items-center space-x-4 mb-4'>
        <div className='rounded-full  p-2 bg-[#c6d0ef]'>
          <PrIconV2 name={'FmdGoodOutlined'} size='medium' color='black' />
        </div>
        <div className='flex-1'>
          <div className='text-black font-semibold'>{title}</div>
          <div className='text-gray-500'>{subtitle}</div>
        </div>
      </div>
      <div className='flex ml-[3rem] space-x-4'>
        {items.map((item, index) => (
          <div key={index} className='flex items-center space-x-6'>
            <div className='flex-1'>
              <div className='text-black font-semibold'>{item.title}</div>
              <div className='text-gray-500'>{item.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAddressCard;
