import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PrPagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <div className='mb-1'>
      <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
        <Pagination count={totalPages} page={currentPage} color='primary' onChange={handlePageChange} />
      </Stack>
    </div>
  );
};

export default PrPagination;
