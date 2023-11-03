import React from 'react';

interface PaginationRowProps {
  totalRows: number;
  currentPageData: any[]; // Replace 'any[]' with your actual data type
  onPageChange: (pageNumber: number) => void;
  currentPage: number;
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const PrRowPagination: React.FC<PaginationRowProps> = ({
  totalRows,
  currentPageData,
  onPageChange,
  currentPage,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalRows / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  return (
    <div className="p-4">
  <div className="flex flex-col items-center space-x-2 rounded-md font-medium border-2  border-blue-500 relative">
    <div className=" absolute  -top-4  bg-white p-1 text-blue-500" >
      Rows
    </div>
    <div>
      <select
        className="py-1 px-2 mt-2 text-blue-500 font-semibold border-none"
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(parseInt(e.target.value, 10))}
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  </div>
</div>

  );
};

export default PrRowPagination;
