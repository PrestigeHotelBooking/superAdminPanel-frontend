import React, { ChangeEvent } from 'react';

interface Option {
    label: string;
    value: string;
}

interface PrSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
}

const PrSelect: React.FC<PrSelectProps> = ({ options, value, onChange }) => {
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };

    return (
        <select value={value} onChange={handleSelectChange}>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default PrSelect;
