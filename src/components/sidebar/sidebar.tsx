import React, { useState } from 'react';
import logo from '../../assets/Navbar/logo.svg';
import Image from 'next/image';
import { SidebarOptionValue, sidebarOptions, sidebarPaths } from './sidebarConstants';
import { useRouter } from 'next/router';
import { useSelectedSidebarOption } from '@/context/useSidebarOption/useSidebarOptionContext';
import PrIcon from '../common/PrIcon/PrIcon';
import PrIconV2 from '../common/PrIcon/PrIconV2';
import ProfileArea from './profileArea';
import PrCircularProgressIndicator from '../common/Loader/PrCircularProgressIndicator';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { selectedOption, updateSelectedOption } = useSelectedSidebarOption();
  const [loader, setLoader] = useState(false); // Step 1: Initialize loading state

  const router = useRouter();

  const handleOptionClick = async (optionValue: SidebarOptionValue) => {
    try {
      setLoader(true); // Step 2: Show loader on navigation start
      await router.push(sidebarPaths[optionValue]);
      updateSelectedOption(optionValue);
    } catch (error) {
      // Handle error if needed
    } finally {
      setLoader(false); // Step 3: Hide loader after navigation is complete
    }
  };

  return (
    <div className='flex h-screen overflow-hidden'>
      <aside className='bg-white w-80 flex-shrink-0 p-4 text-[#404040] relative'>
        <div className='text-3xl ml-2 font-semibold mb-6'>
          <Image src={logo} alt='logo'></Image>
        </div>

        <ul className='space-y-2 ml-2'>
          {sidebarOptions.map(
            (option) =>
              option.value !== 'CONFIGURATION MANAGEMENT' && (
                <li
                  key={option.value}
                  className={`flex items-center space-x-2 p-3 cursor-pointer hover:bg-[#5c77b3] hover:text-white rounded-md  transition-colors duration-100 ${
                    selectedOption === option.value
                      ? 'bg-[#3572F4] text-white border-b-2  hover:bg-[#5c77b3] border-[#3572F4] rounded-md'
                      : ''
                  }`}
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.value === 'DASHBOARD' && <PrIcon name={'Home'}></PrIcon>}
                  {option.value === 'USER MANAGEMENT' && <PrIcon name={'Users'}></PrIcon>}
                  {option.value === 'PROPERTY MANAGEMENT' && <PrIconV2 name={'DomainOutlined'}></PrIconV2>}
                  {option.value === 'BOOKING MANAGEMENT' && <PrIcon name={'Calendar'}></PrIcon>}
                  {option.value === 'PAYMENT MANAGEMENT' && <PrIconV2 name={'PaymentsSharp'}></PrIconV2>}
                  {option.value === 'REPORT AND ANALYSIS' && <PrIcon name={'BarChart2'}></PrIcon>}
                  {option.value === 'NOTIFICATION MANAGEMENT' && <PrIcon name={'Bell'}></PrIcon>}
                  {option.value === 'CONTENT MANAGEMENT' && <PrIcon name={'Edit'}></PrIcon>}
                  <span>{option.label}</span>
                </li>
              ),
          )}
        </ul>

        <div
          className={`absolute ml-2 bottom-0 left-0 p-3 cursor-pointer ${
            selectedOption === 'CONFIGURATION MANAGEMENT'
              ? 'bg-[#3572F4] text-white border-b-2 border-[#3572F4] rounded-b-md'
              : ''
          }`}
          onClick={() => handleOptionClick('CONFIGURATION MANAGEMENT')}
        >
          <div
            className={`flex items-center space-x-2 p-3 cursor-pointer ${
              selectedOption !== 'CONFIGURATION MANAGEMENT' ? ' transition-colors duration-300' : ''
            }`}
          >
            <PrIcon name={'Settings'}></PrIcon>
            <span>{sidebarOptions[sidebarOptions?.length - 1].label}</span>
          </div>
        </div>
      </aside>
      <main className='flex-1 bg-[#f6f7fa] w-full h-full'>
        <ProfileArea />
        {loader ? (
          <div className='flex justify-center items-center h-full'>
            <PrCircularProgressIndicator></PrCircularProgressIndicator>
          </div>
        ) : (
          <div>{children}</div>
        )}
      </main>
    </div>
  );
};

export default Layout;
