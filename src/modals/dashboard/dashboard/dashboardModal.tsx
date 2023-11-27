import React from 'react';
import DashboardCard from '@/components/common/Card/DashboardCard/DashboardCard';
import { DashboardCardKey, DashboardConfiguration } from './common/dashboardTypes';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const cardOrder: DashboardCardKey[] = [
  'PROPERTY',
  'USERS',
  'BOOKING',
  'CANCELLED_BOOKING',
  'REGISTERED_USERS',
  'REVENUE',
  'AVERAGE_USERS_BOOKING',
];

export default function DashboardModal() {
  const userToken = Cookies.get('x-access-token');
  if (userToken) {
    const decoded = jwtDecode(userToken) as { exp: number };

    console.log(decoded);

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    if (decoded.exp && decoded.exp < currentTimeInSeconds) {
      console.log('Token has expired');
    }

    const timeUntilExpiration = decoded.exp - currentTimeInSeconds;

    const hours = Math.floor(timeUntilExpiration / 3600);
    const minutes = Math.floor((timeUntilExpiration % 3600) / 60);
    const seconds = timeUntilExpiration % 60;

    console.log(`Time until expiration: ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
  }

  return (
    <div>
      <div className='flex space-x-4'>
        {cardOrder.slice(0, 4).map((key) => (
          <DashboardCard
            key={key}
            icon={DashboardConfiguration[key].icon}
            title={DashboardConfiguration[key].title}
            counter={2000}
            className={DashboardConfiguration[key].className}
            iconClassName={DashboardConfiguration[key].iconClassName}
          />
        ))}
        <div className='w-[2rem]'></div>
      </div>
      <div className='flex space-x-4 space-y-8'>
        <div className='w-[2rem]'></div>
        {cardOrder.slice(4).map((key) => (
          <DashboardCard
            key={key}
            icon={DashboardConfiguration[key].icon}
            title={DashboardConfiguration[key].title}
            counter={3255}
            className={DashboardConfiguration[key].className}
            iconClassName={DashboardConfiguration[key].iconClassName}
          />
        ))}
        <div className='w-[2rem]'></div>
      </div>
    </div>
  );
}
