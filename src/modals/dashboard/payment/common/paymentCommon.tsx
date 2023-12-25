import { FilterCriteria } from '@/components/helper/criteriaFilter';
import { DateFilterT, SearchFilterT } from '@/modals/common/filter';

export type PaymentStatusT = 'PENDING' | 'FAILED' | 'COMPLETE';
export type RefundStatusT = 'COMPLETED' | 'PROCESSED' | 'FAILED' | 'INITIATED';

const getPaymentStatusBackgroundColor = (status: PaymentStatusT): { bgColour: string; label: string } => {
  switch (status) {
    case 'PENDING':
      return { bgColour: `bg-orange-500`, label: 'Pending' };
    case 'FAILED':
      return { bgColour: 'bg-gray-700', label: 'Failed' };
    case 'COMPLETE':
      return { bgColour: 'bg-green-500', label: 'Complete' };
    default:
      return { bgColour: 'bg-black', label: '' }; // Default color if status doesn't match any case
  }
};

export const paymentStatusColour = [
  {
    label: 'Pending',
    value: 'PENDING',
  },
  {
    label: 'Failed',
    value: 'FAILED',
  },
  {
    label: 'Complete',
    value: 'COMPLETE',
  },
];

export const refundStatusCommon = [
  {
    label: 'Initiated',
    value: 'INITIATED',
  },
  {
    label: 'Processed',
    value: 'PROCESSED',
  },
  {
    label: 'Failed',
    value: 'FAILED',
  },
  {
    label: 'Completed',
    value: 'COMPLETED',
  },
];

const getRefundStatusColor: Record<RefundStatusT, { textColor: string; backgroundColor: string; label: string }> = {
  INITIATED: { textColor: 'text-blue-500', backgroundColor: 'bg-blue-500', label: 'Initiated' },
  PROCESSED: { textColor: 'text-orange-500', backgroundColor: 'bg-orange-500', label: 'Processed' },
  FAILED: { textColor: 'text-red-500', backgroundColor: 'bg-red-500', label: 'Failed' },
  COMPLETED: { textColor: 'text-green-500', backgroundColor: 'bg-green-500', label: 'Completed' },
};

export type paymentModalInputT = {
  pageRows: number;
  datePicker: DateFilterT;
  searchPicker: SearchFilterT;
  userData: any;
};

export const generateFilterQueryWithValues = (columns: string, value: any[]) => {
  const data: FilterCriteria[] = value.map((d) => {
    return {
      field: columns,
      operator: 'EQUALS',
      value: d,
      logicalOperator: 'OR',
    };
  });
  return data;
};

const searchValueOption = [
  {
    label: 'Customer Name',
    value: 'first_name',
  },
  {
    label: 'Property Name',
    value: 'property_name',
  },
];

const bookingDateOption = [
  {
    label: 'Check In',
    value: 'check_in',
  },
  {
    label: 'Created At',
    value: 'createdAt',
  },
  {
    label: 'Check Out',
    value: 'check_out',
  },
];

export const initialPaymentModalInputT: paymentModalInputT = {
  pageRows: 10,
  datePicker: {
    calenderColumn: '',
    calendarStartDate: null,
    calendarEndDate: null,
    calenderColumnOptions: bookingDateOption,
  },
  searchPicker: {
    searchOption: searchValueOption,
    searchText: '',
    searchOptionValue: '',
  },
  userData: [],
};

export { getPaymentStatusBackgroundColor, getRefundStatusColor };
