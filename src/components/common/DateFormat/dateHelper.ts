// components/DateFormatter.tsx
import React from 'react';
import moment from 'moment';

// Define a type for valid date format strings
type DateFormat = 'YYYY-MM-DD' | 'MM/DD/YYYY' | 'DD-MM-YYYY' | 'MMMM D, YYYY' | 'h:mm A';

interface DateFormatterProps {
  date: string;
  format: DateFormat; // Use the defined type
}

const DateFormatter: React.FC<DateFormatterProps> = ({ date, format }) => {
  const formattedDate = moment(date).format(format);
  return formattedDate;
}

export default DateFormatter;

// Create a separate function to get the current date
export function getCurrentDate(format: DateFormat): string {
  return moment().format(format);
}
