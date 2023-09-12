import AmenitiesModal from '@/modals/dashboard/property/common/editProperty/amenitiesModal';
import BasicInfoModal from '@/modals/dashboard/property/common/editProperty/basicInfoModal';
import FinanceModal from '@/modals/dashboard/property/common/editProperty/financeModal';
import PhotosModal from '@/modals/dashboard/property/common/editProperty/photosModal';
import PolicyModal from '@/modals/dashboard/property/common/editProperty/policyModal';
import RoomsModal from '@/modals/dashboard/property/common/editProperty/roomsModal';
import React, { useState } from 'react';

interface TabProps {
  tabName: string;
  activeTab: string;
  onClick: (tabName: string) => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabProps> = ({ tabName, activeTab, onClick, children }) => {
  const isActive = tabName === activeTab;
  const buttonClasses = `flex-grow px-4 py-2 text-left   ${
    isActive ? 'border-b-2 border-blue-600 font-semibold ' : 'bg-white text-gray-600'
  }`;

  return (
    <button className={buttonClasses} onClick={() => onClick(tabName)}>
      {children}
    </button>
  );
};

const EditPropertyTabs: React.FC<{ id: string }> = ({ id }) => {


  const [activeTab, setActiveTab] = useState<string>('basicinfo'); // Set the default active tab

  const handleTabClick = (tabName: string): void => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex flex-col h-screen p-2">
      <div className="p-4 w-full bg-white">
        <div className="flex space-x-4 w-full ">
          <TabButton tabName="basicinfo" activeTab={activeTab} onClick={handleTabClick}>
            Basic Info
          </TabButton>
          <TabButton tabName="rooms" activeTab={activeTab} onClick={handleTabClick}>
            Rooms
          </TabButton>
          <TabButton tabName="amenities" activeTab={activeTab} onClick={handleTabClick}>
            Amenities
          </TabButton>
          <TabButton tabName="photos" activeTab={activeTab} onClick={handleTabClick}>
            Photos
          </TabButton>
          <TabButton tabName="finance" activeTab={activeTab} onClick={handleTabClick}>
            Finance
          </TabButton>
          <TabButton tabName="policy" activeTab={activeTab} onClick={handleTabClick}>
            Policy
          </TabButton>
        </div>
      </div>
      <div className="flex-1  w-full max-h-[100vh] overflow-auto p-4 mb-4  ">
        {activeTab === 'basicinfo' && <BasicInfoModal id={id}></BasicInfoModal>}
        {activeTab === 'rooms' && <RoomsModal id={id}></RoomsModal>}
        {activeTab === 'amenities' &&<AmenitiesModal id={id}></AmenitiesModal>}
        {activeTab === 'photos' && <PhotosModal id={id}></PhotosModal>}
        {activeTab === 'finance' && <FinanceModal id={id}></FinanceModal>}
        {activeTab === 'policy' &&<PolicyModal id={id}></PolicyModal>}
      </div>
    </div>
  );
};

export default EditPropertyTabs;
