import React from 'react';

interface DateFormatProps {
  date: Date | string;
  formatType: 'yyyy-MM-dd' | 'MM/dd/yyyy' | 'dd MMM yyyy' | 'MMMM dd, yyyy';
  className?: string; // Add className prop
}

const DateFormat: React.FC<DateFormatProps> = ({ date, formatType, className }) => {
  if (typeof date === 'string') {
    date = new Date(date); // Convert string to Date object if needed
  }

  const formattedDate = formatDate(date, formatType);

  return (
    <div className={className}>
      <strong> {formattedDate}</strong>
    </div>
  );
};

const formatDate = (date: Date, formatType: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: formatType?.includes('yyyy') ? 'numeric' : undefined,
    month: formatType?.includes('MMM') ? 'short' : undefined,
    day: formatType?.includes('dd') ? '2-digit' : undefined,
  };

  // Set the locale to ensure consistent formatting
  const formattedDate = date?.toLocaleDateString('en-US', options);
  return formattedDate;
};

export default DateFormat;
