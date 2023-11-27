import React from 'react'
import PrIcon from '@/components/common/PrIcon/PrIcon'
import PrButton from '@/components/common/PrButton/PrButton'
import Image from 'next/image'
import AddProperty from '../../../../assets/Property/Add_Property.png'
import PrIconV2 from '../../PrIcon/PrIconV2'

interface AddPropertySuccessFullyProps {
  closeModal: () => void
}

const AddPropertySuccessFully: React.FC<AddPropertySuccessFullyProps> = ({ closeModal }) => {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 '>
      <div className='bg-white p-8 rounded-lg shadow-lg'>
        <div className='flex items-center justify-between border-b border-black mb-4'>
          <h2 className='text-xl font-semibold mb-4'>Created Successfully</h2>
          <PrIcon onClick={closeModal} className='hover:cursor-pointer' name={'X'}></PrIcon>
        </div>
        <div className='flex mt-5 mb-3'>
          <PrIconV2 name={'Verified'} color='green' size={'large'}></PrIconV2>
          <label className='ml-2 text-[1.8rem] font-semibold'> Property Created Successfully</label>
        </div>
        <Image src={AddProperty} alt='Success' width={400} height={300} className='mb-6' />
        <div className='flex justify-center items-center'>
          <PrButton
            label='Ok'
            iconName='ThumbsUp'
            className='rounded-md w-1/4'
            buttonStyle='danger'
            onClick={closeModal}
          ></PrButton>
        </div>
      </div>
    </div>
  )
}

export default AddPropertySuccessFully
