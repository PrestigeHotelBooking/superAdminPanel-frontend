import React from 'react';
import PrIconV2, { MaterialIconsType } from '../../PrIcon/PrIconV2';

interface DashboardCardProps {
  iconClassName: string;
  icon: MaterialIconsType;
  title: string;
  counter: number;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon: Icon, title, counter, iconClassName, className }) => {
  return (
    <div className={`shadow-md rounded-lg p-4 border-l-4 w-full h-full ${className}`}>
      <div className={`flex items-center justify-between`}>
        <div className='flex items-center h-[4rem] p-2 space-x-2'>
          <div className={`rounded-md p-3 ${iconClassName} `}>
            <PrIconV2 name={Icon} size={'large'} color={'white'}></PrIconV2>
          </div>
          <h2 className='text-[1.3rem] p-1 font-semibold text-white'>{title}</h2>
        </div>
      </div>
      <div className='text-[2.375rem] font-semibold p-4 text-white'>{counter}</div>
    </div>
  );
};

export default DashboardCard;
