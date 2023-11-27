import React from 'react';

interface PrTextAreaProps {
  label: string;
  value: string; // Add value prop
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Add onChange prop
}

const PrTextArea: React.FC<PrTextAreaProps> = ({ label, value, onChange, ...props }) => {
  return (
    <div className='mb-4'>
      <label className='block text-[16px] font-bold text-gray-700' htmlFor={label}>
        {label}
      </label>
      <textarea
        className='mt-1 block w-full h-[10rem] p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        value={value} // Bind the value prop
        onChange={onChange} // Bind the onChange prop
        {...props}
      />
    </div>
  );
};

export default PrTextArea;
