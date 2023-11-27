export type reportTabT = 'BOOKING' | 'REVENUE'

interface RevenueTabsProps {
  selectedTab: reportTabT
  onTabChange: (tab: reportTabT) => void // Callback function to notify parent
}

const RevenueTabs: React.FC<RevenueTabsProps> = ({ selectedTab, onTabChange }) => {
  const handleTabClick = (tab: reportTabT) => {
    onTabChange(tab) // Call the callback function with the selected tab
  }
  return (
    <div className='bg-blue-600 h-[5rem] w-full flex rounded-md rounded-tl-lg rounded-tr-lg'>
      <div className='w-[30%] flex'>
        <div
          className={`flex-1 flex items-center justify-center cursor-pointer text-white ${
            selectedTab === 'BOOKING' ? 'border-b-4 border-[#FE4054]' : ''
          }`}
          onClick={() => handleTabClick('BOOKING')}
        >
          Booking
        </div>
        <div
          className={`flex-1 flex items-center justify-center cursor-pointer text-white ${
            selectedTab === 'REVENUE' ? 'border-b-4 border-[#FE4054]' : ''
          }`}
          onClick={() => handleTabClick('REVENUE')}
        >
          Revenue
        </div>
      </div>
    </div>
  )
}

export default RevenueTabs
