import React from 'react';
import countries from '../../../assets/Json/countries.json';

interface PrCountryInputFieldProps {
  className?: string;
  value: string;
  onChange: (newValue: string) => void;
}

export const PrCountryInputField: React.FC<PrCountryInputFieldProps> = ({ className, value, onChange }) => {
  return (
    <select
      className={`block py-2 px-4 border w-[20.5rem] h-[3.5rem] border-gray-300 rounded-md bg-white focus:outline-none focus:border-blue-500 ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value=''>Select a country</option>
      {countries.map((country) => (
        <option key={country.code} value={country.name}>
          {country.name}
        </option>
      ))}
    </select>
  );
};
