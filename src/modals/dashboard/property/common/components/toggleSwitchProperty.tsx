import React, { useState, useEffect } from 'react';

interface ToggleSwitchProps {
  initialState: 0 | 1; // Accepts only 0 or 1 as values
  handleSwitch: (active: boolean) => void; // Callback function to handle switch state
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ initialState, handleSwitch }) => {
  const [isActive, setIsActive] = useState(initialState === 1);

  const handleToggle = () => {
    const newActive = !isActive;
    setIsActive(newActive);
    handleSwitch(newActive); // Notify the parent component about the state change
  };

  useEffect(() => {
    setIsActive(initialState === 1);
  }, [initialState]);

  return (
    <div className={`flex items-center p-2 border rounded-full ${isActive ? 'border-green-500' : 'border-gray-300'}`}>
      {
        !isActive && (
          <button
            onClick={handleToggle}
            className={`relative w-8 h-8 rounded-full focus:outline-none transition-transform duration-300 ${
              isActive ? 'bg-green-500 transform translate-x-full' : 'bg-gray-300'
            }`}
          ></button>
        )
      }
      <div className={`ml-2 text-sm ${isActive ? 'text-green-500' : 'text-gray-500'}`}>
        {isActive ? 'Active' : 'Inactive'}
      </div>
      {
        isActive && (
          <button
            onClick={handleToggle}
            className={`relative w-8 h-8 rounded-full focus:outline-none transition-transform duration-300 ${
              isActive ? 'bg-green-500 transform translate-x-full' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-0 bottom-0 left-0 right-0 w-4 h-4 m-auto rounded-full ${
                isActive ? 'bg-green-500' : 'bg-gray-300'
              }`}
            ></div>
          </button>
        )
      }
    </div>
  );
};

export default ToggleSwitch;
