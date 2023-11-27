import React from 'react'
import PrIcon, { FeatherIconType, IconTypeT } from '../../PrIcon/PrIcon'
import * as FeatherIcons from 'react-feather'
import PrIconV2, { MaterialIconsType } from '../../PrIcon/PrIconV2'

interface UserDetailCardProps {
  items: {
    icon: FeatherIconType | MaterialIconsType
    iconType: IconTypeT // Use the IconTypeT type from your PrIcon component
    title: string
    subtitle: string
  }[]
}

const UserDetailCard: React.FC<UserDetailCardProps> = ({ items }) => {
  return (
    <div className='bg-white p-4 rounded-md w-full shadow-md ml-4'>
      {items.map((item, index) => (
        <div key={index} className='flex items-center space-x-4 mb-4'>
          <div className='rounded-full  p-2 bg-[#c6d0ef]'>
            {item.iconType === 'feather' ? (
              <PrIcon name={item.icon as keyof typeof FeatherIcons} size={24} color='black' />
            ) : (
              <PrIconV2 name={item.icon as MaterialIconsType} size={'medium'} color='black' />
            )}
          </div>
          <div className='flex-1'>
            <div className='text-black font-semibold'>{item.title}</div>
            <div className='text-gray-500'>{item.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserDetailCard
