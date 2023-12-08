import { YesOrNoT } from '@/modals/dashboard/property/common/components/property.types';
import React, { ChangeEvent } from 'react';

interface PrRadioButtonProps {
  options: YesOrNoT[];
  selectedValue: string | number;
  isMulti?: boolean;
  onChange: (value: string | number) => void;
  className?: string; // New optional prop for class name
  label?: string; // New optional prop for label
}

const PrRadioButton: React.FC<PrRadioButtonProps> = ({
  options,
  selectedValue,
  isMulti,
  onChange,
  className,
  label,
}) => {
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`flex flex-col space-y-2 rounded-lg p-4 ${className}`}>
      {label && <label className='font-semibold'>{label}</label>}
      {isMulti ? (
        options.map((option, index) => (
          <label key={index} className='flex items-center justify-between'>
            <input
              type='radio'
              value={option.value}
              checked={selectedValue === option.value}
              onChange={handleRadioChange}
              className='mr-2 ml-3'
            />
            <span className='font-semibold ml-2'>{option.label}</span>
          </label>
        ))
      ) : (
        <div className='flex space-x-16'>
          {options.map((option, index) => (
            <label key={index} className='mr-2'>
              <input
                type='radio'
                value={option.value}
                checked={selectedValue === option.value}
                onChange={handleRadioChange}
              />
              <span className='ml-2 font-semibold'>{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrRadioButton;
