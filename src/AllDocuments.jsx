import React, { useState } from "react";
import Pagination from "./component/layout/pagination_component";

const AllDocuments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

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
    },

    {
      id: 12,
      name: "Project Alpha Report.pdf",
      category: "Finance",
      storage: "Local Disk (Default)",
      client: "Client L",
      createdDate: "4/1/2025",
      expiredDate: "4/1/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 13,
      name: "Meeting Minutes 04-02.docx",
      category: "HR",
      storage: "Local Disk (Default)",
      client: "Client M",
      createdDate: "4/2/2025",
      expiredDate: "4/2/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 14,
      name: "Contract_ClientN_Final.pdf",
      category: "Legal",
      storage: "Local Disk (Default)",
      client: "Client N",
      createdDate: "4/3/2025",
      expiredDate: "4/3/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 15,
      name: "Tech Specs v2.1.docx",
      category: "Tech",
      storage: "Local Disk (Default)",
      client: "Client O",
      createdDate: "4/4/2025",
      expiredDate: "4/4/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 16,
      name: "Q1 Budget Summary.xlsx",
      category: "Finance",
      storage: "Local Disk (Default)",
      client: "Client P",
      createdDate: "4/5/2025",
      expiredDate: "4/5/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 17,
      name: "Marketing Plan 2025.pptx",
      category: "Marketing",
      storage: "Local Disk (Default)",
      client: "Client Q",
      createdDate: "4/6/2025",
      expiredDate: "4/6/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 18,
      name: "Employee Handbook 2025.pdf",
      category: "HR",
      storage: "Local Disk (Default)",
      client: "Client R",
      createdDate: "4/7/2025",
      expiredDate: "4/7/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 19,
      name: "Server Migration Guide.txt",
      category: "Tech",
      storage: "Local Disk (Default)",
      client: "Client S",
      createdDate: "4/8/2025",
      expiredDate: "4/8/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 20,
      name: "Client Feedback Survey.docx",
      category: "Operations",
      storage: "Local Disk (Default)",
      client: "Client T",
      createdDate: "4/9/2025",
      expiredDate: "4/9/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 21,
      name: "Research Findings Q2.pdf",
      category: "Research",
      storage: "Local Disk (Default)",
      client: "Client U",
      createdDate: "4/10/2025",
      expiredDate: "4/10/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 22,
      name: "UI Design Mockups Figma.png",
      category: "Design",
      storage: "Local Disk (Default)",
      client: "Client V",
      createdDate: "4/11/2025",
      expiredDate: "4/11/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 23,
      name: "Data Privacy Policy.pdf",
      category: "Legal",
      storage: "Local Disk (Default)",
      client: "Client W",
      createdDate: "4/12/2025",
      expiredDate: "4/12/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 24,
      name: "Inventory List 2025.xlsx",
      category: "Operations",
      storage: "Local Disk (Default)",
      client: "Client X",
      createdDate: "4/13/2025",
      expiredDate: "4/13/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 25,
      name: "Backend API Documentation.md",
      category: "Tech",
      storage: "Local Disk (Default)",
      client: "Client Y",
      createdDate: "4/14/2025",
      expiredDate: "4/14/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 26,
      name: "Social Media Calendar Q3.xlsx",
      category: "Marketing",
      storage: "Local Disk (Default)",
      client: "Client Z",
      createdDate: "4/15/2025",
      expiredDate: "4/15/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 27,
      name: "Annual Audit Report 2025.pdf",
      category: "Finance",
      storage: "Local Disk (Default)",
      client: "Client AA",
      createdDate: "4/16/2025",
      expiredDate: "4/16/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 28,
      name: "Recruitment Process Flowchart.pdf",
      category: "HR",
      storage: "Local Disk (Default)",
      client: "Client AB",
      createdDate: "4/17/2025",
      expiredDate: "4/17/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 29,
      name: "Network Security Guidelines.docx",
      category: "Tech",
      storage: "Local Disk (Default)",
      client: "Client AC",
      createdDate: "4/18/2025",
      expiredDate: "4/18/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 30,
      name: "Sales Forecast Q4.pptx",
      category: "Marketing",
      storage: "Local Disk (Default)",
      client: "Client AD",
      createdDate: "4/19/2025",
      expiredDate: "4/19/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 31,
      name: "Event Planning Checklist.doc",
      category: "Operations",
      storage: "Local Disk (Default)",
      client: "Client AE",
      createdDate: "4/20/2025",
      expiredDate: "4/20/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 32,
      name: "Codebase Review Notes.txt",
      category: "Tech",
      storage: "Local Disk (Default)",
      client: "Client AF",
      createdDate: "4/21/2025",
      expiredDate: "4/21/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 33,
      name: "Client Onboarding Template.pdf",
      category: "Operations",
      storage: "Local Disk (Default)",
      client: "Client AG",
      createdDate: "4/22/2025",
      expiredDate: "4/22/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 34,
      name: "Budget Approval Request.docx",
      category: "Finance",
      storage: "Local Disk (Default)",
      client: "Client AH",
      createdDate: "4/23/2025",
      expiredDate: "4/23/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 35,
      name: "Workshop Slides Design.pptx",
      category: "Design",
      storage: "Local Disk (Default)",
      client: "Client AI",
      createdDate: "4/24/2025",
      expiredDate: "4/24/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 36,
      name: "Vendor Agreement Draft.pdf",
      category: "Legal",
      storage: "Local Disk (Default)",
      client: "Client AJ",
      createdDate: "4/25/2025",
      expiredDate: "4/25/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 37,
      name: "Infrastructure Upgrade Plan.docx",
      category: "Tech",
      storage: "Local Disk (Default)",
      client: "Client AK",
      createdDate: "4/26/2025",
      expiredDate: "4/26/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 38,
      name: "Customer Survey Results.xlsx",
      category: "Marketing",
      storage: "Local Disk (Default)",
      client: "Client AL",
      createdDate: "4/27/2025",
      expiredDate: "4/27/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 39,
      name: "Press Release Draft.doc",
      category: "Operations",
      storage: "Local Disk (Default)",
      client: "Client AM",
      createdDate: "4/28/2025",
      expiredDate: "4/28/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 40,
      name: "API Integration Guide.md",
      category: "Tech",
      storage: "Local Disk (Default)",
      client: "Client AN",
      createdDate: "4/29/2025",
      expiredDate: "4/29/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 41,
      name: "Quarterly Tax Report.pdf",
      category: "Finance",
      storage: "Local Disk (Default)",
      client: "Client AO",
      createdDate: "4/30/2025",
      expiredDate: "4/30/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 42,
      name: "New Hire Training Video.mp4",
      category: "HR",
      storage: "Local Disk (Default)",
      client: "Client AP",
      createdDate: "5/1/2025",
      expiredDate: "5/1/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 43,
      name: "Brand Style Guide.pdf",
      category: "Design",
      storage: "Local Disk (Default)",
      client: "Client AQ",
      createdDate: "5/2/2025",
      expiredDate: "5/2/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 44,
      name: "IT Procurement List.xlsx",
      category: "Tech",
      storage: "Local Disk (Default)",
      client: "Client AR",
      createdDate: "5/3/2025",
      expiredDate: "5/3/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 45,
      name: "Legal Compliance Checklist.pdf",
      category: "Legal",
      storage: "Local Disk (Default)",
      client: "Client AS",
      createdDate: "5/4/2025",
      expiredDate: "5/4/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 46,
      name: "Product Roadmap 2026.pptx",
      category: "Operations",
      storage: "Local Disk (Default)",
      client: "Client AT",
      createdDate: "5/5/2025",
      expiredDate: "5/5/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 47,
      name: "Expense Reimbursement Form.doc",
      category: "Finance",
      storage: "Local Disk (Default)",
      client: "Client AU",
      createdDate: "5/6/2025",
      expiredDate: "5/6/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 48,
      name: "User Feedback Analysis.docx",
      category: "Research",
      storage: "Local Disk (Default)",
      client: "Client AV",
      createdDate: "5/7/2025",
      expiredDate: "5/7/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 49,
      name: "Server Maintenance Log.txt",
      category: "Tech",
      storage: "Local Disk (Default)",
      client: "Client AW",
      createdDate: "5/8/2025",
      expiredDate: "5/8/2026",
      createdBy: "Ancells Elkins"
    },
    {
      id: 50,
      name: "Annual Report 2025_Final.pdf",
      category: "Finance",
      storage: "Local Disk (Default)",
      client: "Client AX",
      createdDate: "5/9/2025",
      expiredDate: "5/9/2026",
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
      <div className="text-3xl font-bold mb-4">All Documents</div>
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
            <option disabled value="">Storage</option>
            <option>Local Disk (Default)</option>
            <option>Amazon S3</option>
          </select>

          <input 
            className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px]"
            type="date"
            onFocus={(e) => (e.target.showPicker())}
          />

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
          <div className="overflow-x-auto h-full" style={{height: "500px"}}>
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
        <div className="flex justify-between items-center mt-4 text-sm bg-gray-200">
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

export default AllDocuments;