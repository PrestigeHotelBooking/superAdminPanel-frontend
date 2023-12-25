import React from 'react';
import { TableCellPropsT } from '@/components/common/PrTable/PrTableCommon';
import _ from 'lodash';

export type bookingStatusT = 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
export type checkInStatusT = 'NO_SHOW' | 'CHECKED_IN';

export const statusColors: Record<bookingStatusT, { textColor: string; backgroundColor: string; label: string }> = {
  UPCOMING: { textColor: 'text-orange-500', backgroundColor: 'bg-orange-500', label: 'Upcoming' },
  COMPLETED: { textColor: 'text-green-500', backgroundColor: 'bg-green-500', label: 'Completed' },
  CANCELLED: { textColor: 'text-black', backgroundColor: 'bg-black', label: 'Cancelled' },
};

const CheckInStatusColors: Record<checkInStatusT, { bgColor: string; label: string }> = {
  CHECKED_IN: { bgColor: 'bg-green-500', label: 'Checked In' },
  NO_SHOW: { bgColor: 'bg-[#7B7B7B]', label: 'No Show' },
};

interface BookingComponentStatusColorProps {
  data: bookingStatusT;
}

const BookingComponentStatusColor: React.FC<BookingComponentStatusColorProps> = ({ data }) => {
  const { textColor, backgroundColor, label } = statusColors[data] || {};

  if (!textColor || !backgroundColor) {
    return null;
  }

  return (
    <div className='flex space-x-2'>
      <div className={`rounded-full ${backgroundColor} w-4 h-4`}></div>
      <div className={`font-bold ${textColor}`}>{label}</div>
    </div>
  );
};

const BookingComponentStatus: React.FC<TableCellPropsT> = (props) => {
  return <BookingComponentStatusColor data={props?.data} />;
};

interface CheckInStatusComponentProps {
  data: checkInStatusT;
}

const CheckInStatusComponentColor: React.FC<CheckInStatusComponentProps> = (props) => {
  const { bgColor, label } = CheckInStatusColors[props?.data]
    ? CheckInStatusColors[props?.data]
    : { bgColor: 'default-bg-color', label: 'default-label' };

  return <div className={`${bgColor} w-[90%] text-white p-2 rounded-full text-center`}>{label}</div>;
};

const CheckInStatusComponent: React.FC<TableCellPropsT> = (props) => {
  return <CheckInStatusComponentColor data={props?.data}></CheckInStatusComponentColor>;
};

const RoomsSelectedComponent: React.FC<TableCellPropsT> = (props) => {
  const distinctValues: string[] = _.uniq(props?.data);

  const chunkedValues = _.chunk(distinctValues, 2);

  return (
    <div>
      {chunkedValues.map((chunk, rowIndex) => (
        <div key={rowIndex} className='flex space-x-4'>
          {chunk.map((value, index) => (
            <div key={index} className='flex-1'>
              <div className='font-bold'>{_.filter(props?.data, (item) => item === value).length} X </div>
              <div className='bg-black text-white rounded-full p-1 text-center'>{value}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export {
  BookingComponentStatus,
  CheckInStatusComponent,
  RoomsSelectedComponent,
  BookingComponentStatusColor,
  CheckInStatusComponentColor,
};
