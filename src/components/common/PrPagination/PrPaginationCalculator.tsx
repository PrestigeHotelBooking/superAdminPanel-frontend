import { useState, useMemo } from 'react';
import _ from 'lodash';

export const useFilteredPagination = (data: any[], searchText: string, rowsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredData = useMemo(() => {
    return searchText
      ? data.filter((product) => {
          return _.some(product, (value) => {
            if (typeof value === 'string') {
              return value?.toLowerCase()?.includes(searchText?.toLowerCase());
            }
            return false;
          });
        })
      : data;
  }, [searchText, data]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredData?.length);
  const visibleData = filteredData?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return { visibleData, totalPages, currentPage, handlePageChange };
};
