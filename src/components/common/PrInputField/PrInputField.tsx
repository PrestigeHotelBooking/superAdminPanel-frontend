import React, { InputHTMLAttributes, Ref, ChangeEvent } from 'react';

interface PrInputFieldV2Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  ref?: Ref<HTMLInputElement>;
}

const PrInputField: React.FC<PrInputFieldV2Props> = ({ label, className, type, ...inputProps }) => {
  const isNumberType = type === "number";
  const inputClasses = `mt-2 px-3 py-2 block w-[20.5rem] h-[3.5rem] border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className || ''}`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isNumberType) {
      const key = e.key;
      // Allow only numeric characters and certain keys like Backspace, ArrowLeft, ArrowRight, Delete, Home, and End
      if (!/^[0-9\b]+$/.test(key) && !['ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End','Backspace'].includes(key)) {
        e.preventDefault();
      }
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label className="block font-semibold mb-2 mt-1 text-[#06164C]">{label}</label>
      <input
        {...inputProps}
        type={isNumberType ? "text" : type}
        className={inputClasses}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default PrInputField;
