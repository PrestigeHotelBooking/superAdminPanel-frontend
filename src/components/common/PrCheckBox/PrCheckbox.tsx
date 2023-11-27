import React from 'react'

interface PrCheckboxProps {
  id: string
  label: string
  onClick?: (isChecked: boolean) => void
  value?: boolean
}

function PrCheckbox({ id, label, onClick, value }: PrCheckboxProps) {
  const handleChange = () => {
    if (onClick) {
      onClick(!value) // Toggle the value and pass it to the onClick callback
    }
  }

  return (
    <div className='flex items-center space-x-2 mb-2 p-2'>
      <input type='checkbox' id={id} className='form-checkbox h-6 w-6' onChange={handleChange} checked={value} />
      <label className='font-semibold text-md' htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

export default PrCheckbox
