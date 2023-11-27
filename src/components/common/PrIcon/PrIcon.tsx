import React from 'react'
import * as FeatherIcons from 'react-feather'

export type IconTypeT = 'feather' | 'material'
export type FeatherIconType = keyof typeof FeatherIcons

interface PrIconFeatherProps {
  name: FeatherIconType
  size?: number
  color?: string
  className?: string
  onClick?: () => void
  label?: string
  labelPosition?: 'right' | 'left'
}

const PrIcon: React.FC<PrIconFeatherProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  className,
  onClick,
  label,
  labelPosition,
}) => {
  const FeatherIcon = FeatherIcons[name]

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <div className={`flex items-center ${labelPosition === 'right' ? 'flex-row' : 'flex-row-reverse'}`}>
      {labelPosition === 'left' && label && <span className='mr-2'>{label}</span>}
      <FeatherIcon size={size} color={color} className={className} onClick={onClick ? handleClick : undefined} />
      {labelPosition === 'right' && label && <span className='ml-2'>{label}</span>}
    </div>
  )
}

export default PrIcon
