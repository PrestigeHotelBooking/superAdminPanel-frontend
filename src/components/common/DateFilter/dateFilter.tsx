import React, { useState, useRef, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import PrIcon from '../PrIcon/PrIcon'
import PrSelect, { OptionT } from '../PrSelect/PrSelect'
import { dateFilterUserOption } from '@/modals/dashboard/user/common/userCommon'

interface ReactDatePickerDateRangePickerProps {
  onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void
  options: OptionT[]
  value: string
  onChange: (value: any) => void
  onClear: () => void
}

const DateFilter: React.FC<ReactDatePickerDateRangePickerProps> = ({
  onDateRangeChange,
  options,
  value,
  onChange,
  onClear,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [previousStartDate, setPreviousStartDate] = useState<Date | null>(null)
  const [previousEndDate, setPreviousEndDate] = useState<Date | null>(null)

  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    const [newStartDate, newEndDate] = dates

    setPreviousStartDate(startDate)
    setPreviousEndDate(endDate)

    setStartDate(newStartDate)
    setEndDate(newEndDate)

    onDateRangeChange(newStartDate, newEndDate)
  }

  const formatDate = (date: Date | null) => {
    return date
  }

  const dateRangeDisplay = startDate && endDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : ''

  const handleIconClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true)
    }
  }

  const handleClear = () => {
    setStartDate(null)
    setEndDate(null)
    onDateRangeChange(null, null) // Call the onDateRangeChange prop with null dates
    onClear() // Call the onClear prop
  }

  const datePickerRef = useRef<DatePicker | null>(null)

  return (
    <div className='flex flex-row rounded-full bg-white h-[3rem] outline-none'>
      <div className='p-1 w-32 ml-3 mb-2'>
        <PrSelect
          label={''}
          options={options || []}
          value={value}
          className='h-full mb-2 w-full !border-none'
          onChange={onChange}
        ></PrSelect>
      </div>
      <div className='flex flex-row items-center'>
        <div onClick={handleIconClick}>
          <PrIcon name='Calendar' className='ml-2 cursor-pointer' size={21} color='blue' />
        </div>
        {startDate && endDate && (
          <div onClick={handleClear} className='cursor-pointer ml-2'>
            <PrIcon name='X' size={21} color='red' />
          </div>
        )}
        <div>
          <DatePicker
            selected={startDate}
            onChange={handleDateRangeChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            dateFormat='dd-MM-yyyy'
            placeholderText='dd-MM-yyyy - dd-MM-yyyy'
            className='custom-datepicker p-1 mt-1 bg-transparent text-black outline-none'
            customInput={<input value={dateRangeDisplay} readOnly />}
            onInputClick={handleIconClick}
            ref={datePickerRef}
          />
        </div>
      </div>
    </div>
  )
}

export default DateFilter
