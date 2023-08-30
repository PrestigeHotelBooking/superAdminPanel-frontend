import React, { ChangeEvent } from 'react';

interface Option {
    label: string;
    value: string;
}

interface PrRadioButtonProps {
    options: Option[];
    selectedValue: string;
    onChange: (value: string) => void;
}

const PrRadioButton: React.FC<PrRadioButtonProps> = ({ options, selectedValue, onChange }) => {
    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div>
            {options.map((option, index) => (
                <label key={index}>
                    <input
                        type="radio"
                        value={option.value}
                        checked={selectedValue === option.value}
                        onChange={handleRadioChange}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
};

export default PrRadioButton;
