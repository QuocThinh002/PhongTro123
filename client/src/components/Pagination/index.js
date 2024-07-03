import React from 'react';
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';

const Pagination = ({ numPages, currentPage, onPageChange }) => {
  const sizeLeft = 4; // => size = 2 * sizeLeft + 1
  numPages = numPages==1 ? 0:numPages

  const getPageRange = (currentPage) => {
    const range = [];
    if (currentPage <= sizeLeft) currentPage = sizeLeft + 1;
    if (currentPage > numPages - sizeLeft) currentPage = numPages - sizeLeft;

    const start = Math.max(1, currentPage - sizeLeft);
    const end = Math.min(numPages, currentPage + sizeLeft);
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      {currentPage > (sizeLeft + 1) && (
        <span
          onClick={() => onPageChange(1)}
          className="w-10 h-10 rounded shadow cursor-pointer bg-white inline-flex items-center justify-center text-gray-600 hover:bg-gray-200"
        >
          <FaAnglesLeft />
        </span>
      )}
      {getPageRange(currentPage).map((page) => (
        <span
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 h-10 leading-10 text-lg rounded shadow font-medium cursor-pointer transition-colors duration-200 ${
            page === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-200'
          }`}
        >
          {page}
        </span>
      ))}
      {currentPage < (numPages - sizeLeft) && (
        <span
          onClick={() => onPageChange(numPages)}
          className="w-10 h-10 rounded shadow cursor-pointer bg-white inline-flex items-center justify-center text-gray-600 hover:bg-gray-200"
        >
          <FaAnglesRight />
        </span>
      )}
    </div>
  );
};

export default Pagination;
