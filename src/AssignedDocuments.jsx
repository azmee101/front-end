import React, { useState } from "react";
import Pagination from "./component/layout/pagination_component";

const AssignedDocuments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Sample data array - replace with your actual data source
  const documents = [
    {
      id: 1,
      name: "Draft letter for Sender ID.doc",
      category: "ww",
      storage: "Local Disk (Default)",
      client: "Client A",
      createdDate: "5/3/2025",
      expiredDate: "5/3/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 2,
      name: "out put pour ORSYS",
      category: "Admin",
      storage: "Local Disk (Default)",
      client: "Client B",
      createdDate: "5/2/2025",
      expiredDate: "5/2/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 3,
      name: "model G DE MOI 01",
      category: "jusqua 6",
      storage: "Local Disk (Default)",
      client: "Client C",
      createdDate: "5/2/2025",
      expiredDate: "5/2/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 4,
      name: "WhatsApp image 2025-04-30 at 12.50.47 PM_ipeg",
      category: "Child Photos",
      storage: "Local Disk (Default)",
      client: "Client D",
      createdDate: "5/2/2025",
      expiredDate: "5/2/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 5,
      name: "J-LKL",
      category: "Admin",
      storage: "Local Disk (Default)",
      client: "Client E",
      createdDate: "5/2/2025",
      expiredDate: "5/2/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 6,
      name: "signeddnew-wgZGmNyPB.pdf",
      category: "Admin",
      storage: "Local Disk (Default)",
      client: "Client F",
      createdDate: "4/30/2025",
      expiredDate: "5/2/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 7,
      name: "Rajesh (1).docx",
      category: "Admin",
      storage: "Local Disk (Default)",
      client: "Client G",
      createdDate: "4/29/2025",
      expiredDate: "5/2/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 8,
      name: "PLP TALLY MANIFEST",
      category: "Admin",
      storage: "Local Disk (Default)",
      client: "Client H",
      createdDate: "4/29/2025",
      expiredDate: "5/2/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 9,
      name: "PLP KOJA SEGU2512900.pdf",
      category: "Admin",
      storage: "Local Disk (Default)",
      client: "Client I",
      createdDate: "4/29/2025",
      expiredDate: "5/2/2026",
      createdBy: "Ancells Elkins"
    },    
    {
      id: 10,
      name: "Contrato Clean New.pdf",
      category: "Admin",
      storage: "Local Disk (Default)",
      client: "Client J",
      createdDate: "4/28/2025",
      expiredDate: "5/2/2026",
      createdBy: "Ancells Elkins"
    },

    {
      id: 11,
      name: "Additional Document.pdf",
      category: "Admin",
      storage: "Local Disk (Default)",
      client: "Client K",
      createdDate: "4/30/2025",
      expiredDate: "5/3/2026",
      createdBy: "Ancells Elkins"
    }

  ];

  // Pagination calculations
  const totalPages = Math.ceil(documents.length / rowsPerPage);
  const currentDocuments = documents.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="flex-1 p-4">
      <div className="text-3xl font-bold mb-4">Assigned Documents</div>
      <div className="bg-white p-4 font-sans rounded-2xl flex-1 flex flex-col">
        {/* Header Section */}
        <div className="flex flex-wrap gap-4 mb-7">
          <input 
            className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px]"
            type="text"
            placeholder="Search by name or description"
          />
          <input 
            className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px]"
            type="text"
            placeholder="Search by meta tags"
          />
          <select 
            className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px] appearance-none bg-no-repeat bg-[right_0.75rem_center] text-gray-400"
            style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')" }}
            defaultValue=""
          >
            <option disabled value="">Select Category</option>
            <option>Admin</option>
            <option>ww</option>
            <option>jusqua 6</option>
            <option>Child Photos</option>
          </select>
          <select 
            className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px] appearance-none bg-no-repeat bg-[right_0.75rem_center] text-gray-400"
            style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')" }}
            defaultValue=""
          >
            <option disabled value="">Select</option>
            <option>Local Disk (Default)</option>
            <option>Amazon S3</option>
          </select>
          <select 
            className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px] appearance-none bg-no-repeat bg-[right_0.75rem_center] text-gray-400"
            style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')" }}
            defaultValue=""
          >
            <option disabled value="">Select Client</option>
            <option>abc</option>
            <option>rty</option>
            <option>ORSYS</option>
          </select>
        </div>

        <hr className="mb-4" />

        {/* Table Section */}
        <div className="flex-1 overflow-hidden">
          <div className="overflow-x-auto h-full" style={{height: "250px"}}>
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
                {currentDocuments.map((document) => (
                  <tr key={document.id}>
                    <td className="py-2 px-4">
                      <button className="text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
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

        {/* Pagination Section */}
        <div className="flex justify-between items-center mt-4 text-sm bg-gray-200 p-3">
          <Pagination  
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            rowsPerPage={rowsPerPage}
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

export default AssignedDocuments;