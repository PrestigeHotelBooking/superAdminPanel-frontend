import React, { useState } from 'react';

interface PrModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const PrModal: React.FC<PrModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <div className={`fixed inset-0 ${isOpen ? '' : 'hidden'}`}>
      <div className='flex items-center justify-center   min-h-screen px-4 bg-black bg-opacity-50 translate-x-0'>
        <div className='bg-white rounded-lg shadow-lg w-full  max-w-[70%]'>
          <div className='p-4 bg-blue-500 text-white rounded-t-lg'>
            <div className='flex justify-between items-center'>
              <h2 className='text-lg font-semibold'>{title}</h2>
              <button className='text-white' onClick={onClose}>
                Close
              </button>
            </div>
          </div>
          <div className='p-4 w-full'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PrModal;
