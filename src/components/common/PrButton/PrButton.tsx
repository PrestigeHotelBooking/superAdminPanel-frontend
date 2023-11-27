import React from 'react'
import PrIcon from '../PrIcon/PrIcon' // Replace with your PrIcon component
import * as FeatherIcons from 'react-feather'

import { CircularProgress } from '@mui/material'

// Define a custom type for button types
type ButtonType = 'button' | 'submit' | 'reset'

// Define a custom type for button styles
type ButtonStyle = 'primary' | 'danger' | 'success' | 'info' | 'warning' | 'gray' | 'white'

interface PrButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconName?: keyof typeof FeatherIcons
  iconPosition?: 'left' | 'right'
  iconSize?: number
  iconColor?: string
  label: string
  buttonType?: ButtonType
  buttonStyle?: ButtonStyle
  loading?: boolean
}

const PrButton: React.FC<PrButtonProps> = ({
  iconName,
  iconPosition = 'left',
  iconSize = 23,
  iconColor = 'currentColor',
  label,
  buttonType = 'button',
  buttonStyle = 'primary',
  loading = false,
  ...props
}) => {
  const getButtonClassName = () => {
    switch (buttonStyle) {
      case 'danger':
        return 'bg-red-600 rounded-full py-2 px-4 text-white'
      case 'success':
        return 'bg-green-600 rounded-full py-2 px-4 text-white'
      case 'info':
        return 'bg-blue-600 rounded-full py-2 px-4 text-white'
      case 'warning':
        return 'bg-yellow-500 rounded-full py-2 px-4 text-white'
      case 'gray':
        return 'bg-gray-400 rounded-full py-2 px-4 text-white'
      case 'white':
        return 'bg-white border border-gray-300 rounded-full py-2 px-4 text-gray-700'
      // Default to primary style
      default:
        return 'bg-blue-600 rounded-full py-1 px-2 text-white'
    }
  }

  const alignClass = iconPosition === 'left' ? 'flex items-center' : 'flex items-center flex-row-reverse'

  const iconStyles = {
    marginRight: iconPosition === 'left' ? '0.5rem' : '0.25rem', // Adjust the margin based on icon position
    marginLeft: iconPosition === 'right' ? '0.5rem' : '0.25rem', // Adjust the margin based on icon position
  }

  const labelStyles = {
    marginRight: iconPosition === 'right' ? '0.5rem' : '0.25rem', // Adjust the margin based on icon position
    marginLeft: iconPosition === 'left' ? '0.5rem' : '0.25rem', // Adjust the margin based on icon position
  }

  return (
    <button
      {...props}
      type={buttonType}
      className={`w-[8rem] h-[3rem] ${getButtonClassName()} ${alignClass} ${props.className}`}
    >
      {iconName && (
        <span className='pr-icon' style={iconStyles}>
          <PrIcon name={iconName} size={iconSize} color={iconColor} />
        </span>
      )}
      <span style={labelStyles}>
        {loading ? <CircularProgress></CircularProgress> : null}
        {label}
      </span>
    </button>
  )
}

export default PrButton
