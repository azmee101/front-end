import React from 'react';

const Pagination = ({
  rowsPerPage,
  onRowsPerPageChange,
}) => {
  return (
    <div className="flex justify-end items-center gap-4 p-1">
      <div className="flex items-center gap-2">
        <label className="font-medium">View:</label>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="border px-4 py-2 rounded-md text-gray-600 bg-white hover:bg-gray-50 transition-colors"
        >
          {[
            { label: '10 files', value: 10 },
            { label: '50 files', value: 50 },
            { label: '100 files', value: 100 },
            { label: 'All files', value: Infinity }
          ].map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;