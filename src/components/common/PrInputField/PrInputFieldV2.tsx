import React, { InputHTMLAttributes } from 'react'

interface PrInputFieldV2Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  className?: string
}

const PrInputFieldV2: React.FC<PrInputFieldV2Props> = ({ label, className, ...inputProps }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className='block font-semibold mb-1 h-8 text-[#06164C]'>{label}</label>
      <input
        {...inputProps}
        className='border-b border-gray-300 py-1 px-2 h-[2rem] w-full resize-none focus:outline-none focus:border-blue-500'
      />
    </div>
  )
}

export default PrInputFieldV2
