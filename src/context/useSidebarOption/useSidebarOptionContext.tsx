import { SidebarOptionValue } from '@/components/sidebar/sidebarConstants';
import React, { createContext, useContext, useState } from 'react';

export type SelectedOptionContextValue = {
  selectedOption: SidebarOptionValue;
  updateSelectedOption: (optionValue: SidebarOptionValue) => void;
};

export const SelectedSidebarOptionContext = createContext<SelectedOptionContextValue | null>(null);

export const useSelectedSidebarOption = (): SelectedOptionContextValue => {
  const context = useContext(SelectedSidebarOptionContext);
  if (!context) {
    throw new Error('useSelectedSidebarOption must be used within a SelectedSidebarOptionProvider');
  }
  return context;
};

interface SelectedSidebarOptionProviderProps {
  children: React.ReactNode;
}

export const SelectedSidebarOptionProvider: React.FC<SelectedSidebarOptionProviderProps> = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState<SidebarOptionValue>('DASHBOARD'); // Set initial value here

  const updateSelectedOption = (optionValue: SidebarOptionValue) => {
    setSelectedOption(optionValue);
  };

  const contextValue: SelectedOptionContextValue = { selectedOption, updateSelectedOption };

  return <SelectedSidebarOptionContext.Provider value={contextValue}>{children}</SelectedSidebarOptionContext.Provider>;
};
