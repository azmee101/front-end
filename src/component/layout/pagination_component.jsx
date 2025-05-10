import React from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
}) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const generatePageNumbers = () => {
    if (totalPages <= 1) return [];
    
    const pages = [];
    pages.push(1);

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);

    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4">
      <div className="flex items-center gap-2">
        <label className="font-medium">Rows per page:</label>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="border px-2 py-1 rounded"
        >
          {[10, 20, 50].map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-center items-center gap-2 flex-wrap">
        <button
          className={`px-4 py-2 border rounded-md transition-all duration-300 
            ${currentPage === 1 
              ? 'bg-gray-100 cursor-not-allowed opacity-50' 
              : 'hover:bg-gray-100 bg-white border-gray-300'}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {generatePageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 select-none">...</span>
            ) : (
              <button
                className={`px-4 py-2 border rounded-md transition-all duration-300
                  ${currentPage === page 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'hover:bg-gray-100 bg-white border-gray-300'}`}
                onClick={() => handlePageChange(page)}
                disabled={currentPage === page}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        <button
          className={`px-4 py-2 border rounded-md transition-all duration-300 
            ${currentPage === totalPages 
              ? 'bg-gray-100 cursor-not-allowed opacity-50' 
              : 'hover:bg-gray-100 bg-white border-gray-300'}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;