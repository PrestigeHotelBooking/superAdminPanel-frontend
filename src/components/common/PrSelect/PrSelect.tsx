import React, { ChangeEvent } from 'react';

export interface OptionT {
  label: string;
  value: string;
}

interface PrSelectProps {
  label: string; // New label prop
  className?: string; // Optional className prop
  options: OptionT[];
  value: string;
  onChange: (value: string) => void;
}

const PrSelect: React.FC<PrSelectProps> = ({ label, className, options, value, onChange }) => {
  const inputFieldStyles = `
        mt-2 px-3 py-2 block w-[20.5rem] h-[3.5rem] border border-gray-300
        rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
        ${className || ''}`; // Include optional className prop

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label className='block font-semibold mb-2 mt-1 text-[#06164C]'>{label}</label>
      <select value={value} onChange={handleSelectChange} className={inputFieldStyles}>
        {(options || [])?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PrSelect;
