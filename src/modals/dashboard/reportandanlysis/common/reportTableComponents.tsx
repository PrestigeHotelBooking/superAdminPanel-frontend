import { TableCellPropsT } from '@/components/common/PrTable/PrTableCommon';

type paymentStatusT = 'failed' | 'paid';

const paymentStatusColor = (status: paymentStatusT) => {
  switch (status) {
    case 'failed':
      return 'bg-orange-500'; // Return orange for failed payment
    case 'paid':
      return 'bg-green-500'; // Return green for paid payment
    default:
      return 'bg-black-500'; // Default color for other cases
  }
};

const PaymentStatusCellComponent: React.FC<TableCellPropsT> = (props) => {
  const bgColour = paymentStatusColor(props.data);
  return <div className={`${bgColour} p-2 rounded-full text-white w-[60%] text-center`}>{props.data}</div>;
};

const BookingCellComponent: React.FC<TableCellPropsT> = (props) => {
  return <div className='font-bold text-black text-[2rem]'>{props.data}</div>;
};
const PropertyCellComponent: React.FC<TableCellPropsT> = (props) => {
  return <div className='font-bold text-black  text-[1rem]'>{props.data}</div>;
};
const IndexCellComponent: React.FC<TableCellPropsT> = (props) => {
  return <div className='font-bold text-black  text-[1rem]'>{props.data}</div>;
};

export { BookingCellComponent, PropertyCellComponent, IndexCellComponent, PaymentStatusCellComponent };
