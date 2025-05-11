import React, { useState, useEffect } from "react";
import Pagination from "./component/layout/pagination_component";

const AllDocuments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [documents, setDocuments] = useState([]);
  const [startFrom, setStartFrom] = useState(0);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    totalDocuments;
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3001/documents?_start=${startFrom}_page=${currentPage}&_limit=${rowsPerPage}`
        );

        if (!response.ok) throw new Error("Failed to fetch documents");

        // Correct: Use the proper header name 'X-Total-Count'
        const total = response.headers.get('X-Total-Count');
        console.log("toto", total)
        const data = await response.json();
        setTotalPages(Number(total) / rowsPerPage)
        setTotalDocuments(Number(total));
        setDocuments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [currentPage, rowsPerPage]); // Ensure these dependencies are correct

  if (loading) return <div className="p-4">Loading documents...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="flex-1 p-4">
      <div className="text-3xl font-bold mb-4">All Documents</div>
      <div className="bg-white p-4 font-sans rounded-2xl flex-1 flex flex-col">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-7">
          <input className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px]" type="text" placeholder="Search by name or description" />
          <input className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px]" type="text" placeholder="Search by meta tags" />
          <select className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px] appearance-none bg-no-repeat bg-[right_0.75rem_center] text-gray-400" defaultValue="">
            <option disabled value="">Select Category</option>
            <option>Admin</option>
            <option>ww</option>
            <option>jusqua 6</option>
            <option>Child Photos</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px] appearance-none bg-no-repeat bg-[right_0.75rem_center] text-gray-400" defaultValue="">
            <option disabled value="">Storage</option>
            <option>Local Disk (Default)</option>
            <option>Amazon S3</option>
          </select>
          <input className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px]" type="date" />
          <select className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px] appearance-none bg-no-repeat bg-[right_0.75rem_center] text-gray-400" defaultValue="">
            <option disabled value="">Select Client</option>
            <option>abc</option>
            <option>rty</option>
            <option>ORSYS</option>
          </select>
        </div>

        <hr className="mb-4" />

        {/* Table */}
        <div className="flex-1 overflow-hidden">
          <div className="overflow-x-auto h-full" style={{ height: "500px" }}>
            <table className="w-full text-lg">
              <thead className="sticky top-0 bg-gray-200 z-10">
                <tr>
                  <th className="text-left py-4 px-6 pl-4">Action</th>
                  <th className="text-left py-2 px-4">Name</th>
                  <th className="text-left py-2 px-4">Category Name</th>
                  <th className="text-left py-2 px-4">Storage</th>
                  <th className="text-left py-2 px-4">Client</th>
                  <th className="text-left py-2 px-4">Created Date ↓</th>
                  <th className="text-left py-2 px-4">Expired Date</th>
                  <th className="text-left py-2 px-4">Created By</th>
                </tr>
              </thead>
              <tbody className="[&_tr]:border-b [&_td]:py-2 [&_td]:px-4">
                {documents.map((document) => (
                  <tr key={document.id}>
                    <td className="py-2 px-4">
                      <button className="text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
                        </svg>
                      </button>
                    </td>
                    <td className="truncate max-w-[200px] text-blue-500">{document.name}</td>
                    <td className="truncate max-w-[200px]">{document.category}</td>
                    <td className="truncate max-w-[200px]">{document.storage}</td>
                    <td className="truncate max-w-[200px]">{document.client}</td>
                    <td className="truncate max-w-[200px]">{document.createdDate}</td>
                    <td className="truncate max-w-[200px] text-red-500">{document.expiredDate}</td>
                    <td className="truncate max-w-[200px]">{document.createdBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm bg-gray-200">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            rowsPerPage={rowsPerPage}
            startFrom={startFrom}
            setStartFrom={setStartFrom}
            onRowsPerPageChange={(newSize) => {
              setRowsPerPage(newSize);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AllDocuments;