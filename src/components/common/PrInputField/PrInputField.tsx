import React, { InputHTMLAttributes, useRef, useState, useEffect } from 'react';

interface PrInputFieldV2Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

const PrInputField: React.FC<PrInputFieldV2Props> = ({ label, className, type, value, ...inputProps }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(value || '');
  const isNumberType = type === 'number';
  const inputClasses = `mt-2 px-3 py-2 block w-[20.5rem] h-[3.5rem] border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className || ''}`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isNumberType) {
      const key = e.key;
      if (
        !/^[0-9\b]+$/.test(key) && // Allow only numeric characters and Backspace
        !['ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End', 'Backspace'].includes(key)
      ) {
        e.preventDefault();
      }
    }
  };

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = isNumberType ? e.target.value.replace(/[^0-9]/g, '') : e.target.value;
    setInputValue(newValue);

    if (inputProps.onChange) {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: newValue,
        },
      };
      inputProps.onChange(syntheticEvent); // Trigger the original onChange event
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label className="block font-semibold mb-2 mt-1 text-[#06164C]">{label}</label>
      <input
        {...inputProps}
        ref={inputRef}
        type={isNumberType ? 'text' : type}
        value={inputValue}
        className={inputClasses}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default PrInputField;
