import React, { useState, ChangeEvent } from 'react'
import PrIcon from '../PrIcon/PrIcon' // Replace with your PrIcon component
import PrSelect, { OptionT } from '../PrSelect/PrSelect'

interface PrSearchProps {
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void // Use ChangeEvent<HTMLInputElement>
  value: string // Add value prop to sync with parent component
  prSelectOption: OptionT[]
  prSelectValue: string
  prOnChange: (value: string) => void
  onClear: () => void
}

const PrSearch: React.FC<PrSearchProps> = ({ onSearch, value, prOnChange, prSelectValue, prSelectOption, onClear }) => {
  const [searchQuery, setSearchQuery] = useState(value)

  const handleSearch = () => {
    const eventObject = { target: { value: searchQuery } } as ChangeEvent<HTMLInputElement>
    onSearch(eventObject)
  }

  const handleClear = () => {
    setSearchQuery('')
    const eventObject = { target: { value: '' } } as ChangeEvent<HTMLInputElement>
    onSearch(eventObject)
    onClear() // Call the onClear prop
  }

  return (
    <div className='flex items-center rounded-full border bg-white w-fit h-[3rem]'>
      <div className='mt-2 ml-2 w-32 h-2rem border-none outline-none bg-white'>
        <PrSelect
          label={''}
          options={prSelectOption}
          value={prSelectValue}
          className='w-full h-full'
          onChange={prOnChange}
        />
      </div>
      <div className='pl-2 pr-1'>
        <PrIcon name='Search' size={18} color='blue' />
      </div>
      <input
        type='text'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onBlur={handleSearch} // Trigger search on blur
        className='bg-transparent text-black flex-1 h-full p-1 outline-none'
        placeholder='Search...'
      />
      {searchQuery && (
        <button className='flex items-center p-2' onClick={handleClear}>
          <PrIcon name='X' size={16} color='black' />
        </button>
      )}
    </div>
  )
}

export default PrSearch
