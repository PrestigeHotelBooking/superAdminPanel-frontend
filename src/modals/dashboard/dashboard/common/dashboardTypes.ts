import { MaterialIconsType } from '@/components/common/PrIcon/PrIconV2';

export type DashboardCardKey =
  | 'PROPERTY'
  | 'USERS'
  | 'BOOKING'
  | 'CANCELLED_BOOKING'
  | 'REVENUE'
  | 'AVERAGE_USERS'
  | 'REGISTERED_USERS'
  | 'AVERAGE_USERS_BOOKING';

interface DashboardCardConfiguration {
  title: string;
  className: string;
  iconClassName: string;
  icon: MaterialIconsType;
}

export const DashboardConfiguration: Record<DashboardCardKey, DashboardCardConfiguration> = {
  PROPERTY: {
    title: 'Total Number Of Property',
    className: 'bg-[#656C78]',
    iconClassName: 'bg-[#3F4A5F]',
    icon: 'ApartmentSharp',
  },
  USERS: {
    title: 'Total Number Of Users',
    className: 'bg-[#7B7CB2]',
    iconClassName: 'bg-[#4D4E89]',
    icon: 'Groups2Sharp',
  },
  BOOKING: {
    title: 'Total Number Of  bookings',
    className: 'bg-[#94B6A3]',
    iconClassName: 'bg-[#265D3E]',
    icon: 'BookOnlineSharp',
  },
  CANCELLED_BOOKING: {
    title: 'Total Number Of Cancelled bookings',
    className: 'bg-[#D894A0]',
    iconClassName: 'bg-[#C94D63]',
    icon: 'AppBlocking',
  },

  AVERAGE_USERS: {
    title: 'Average Users Booking This week',
    className: 'bg-[#D9AA91]',
    iconClassName: 'bg-[#BF734B]',
    icon: 'People',
  },
  REVENUE: {
    title: 'Total Revenue Generated (Convenience Charge)',
    className: 'bg-[#C7A549]',
    iconClassName: 'bg-[#846D2E]',
    icon: 'BarChart',
  },
  REGISTERED_USERS: {
    title: 'Total Users registered within a week',
    className: 'bg-[#5B83D9]',
    iconClassName: 'bg-[#385593]',
    icon: 'GroupsSharp',
  },
  AVERAGE_USERS_BOOKING: {
    title: 'Average Users Booking This week',
    className: 'bg-[#D9AA91]',
    iconClassName: 'bg-[#BF734B]',
    icon: 'People',
  },
};
