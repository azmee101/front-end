import React, { useState, useEffect, useCallback } from "react";
import Pagination from "./component/layout/pagination_component";
import Action from "./component/layout/Action";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "./utility/userUtils";

const AssignedDocuments = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(Infinity);
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [startFrom, setStartFrom] = useState(0);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState({
    search: "",
    metaTags: "",
    category: "",
    storage: "",
    client: ""
  });

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const currentUser = getCurrentUser();
      
      if (!currentUser) {
        navigate("/");
        return;
      }

      const response = await fetch('http://localhost:3001/assignedDocuments');
      if (!response.ok) throw new Error("Failed to fetch assigned documents");
      
      const allDocuments = await response.json();
      console.log(allDocuments,currentUser.user_id);
      // Filter documents based on user role
      const userDocs = allDocuments.filter(
        (doc) => doc.assignedToId.toString() === currentUser.user_id.toString()
      );

      const total = userDocs.length;
      setTotalDocuments(total);
      setDocuments(userDocs);
      setFilteredDocuments(userDocs);
      setTotalPages(Math.ceil(total / (rowsPerPage === Infinity ? total : rowsPerPage)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [rowsPerPage, navigate]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apply filters
  useEffect(() => {
    if (!documents.length) return;

    try {
      setLoading(true);
      let filtered = [...documents];      // Apply search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(doc => 
          doc.name?.toLowerCase().includes(searchLower) ||
          doc.description?.toLowerCase().includes(searchLower) ||
          doc.documentId?.toString().includes(searchLower)
        );
      }

      // Apply meta tags filter
      if (filters.metaTags) {
        const tagsLower = filters.metaTags.toLowerCase();
        filtered = filtered.filter(doc =>
          doc.metaTags?.some(tag => tag.toLowerCase().includes(tagsLower))
        );
      }

      // Apply category filter
      if (filters.category) {
        filtered = filtered.filter(doc =>
          doc.category === filters.category
        );
      }

      // Apply storage filter
      if (filters.storage) {
        filtered = filtered.filter(doc =>
          doc.storage === filters.storage
        );
      }

      setFilteredDocuments(filtered);
      // Update total pages based on filtered results
      setTotalPages(Math.ceil(filtered.length / (rowsPerPage === Infinity ? filtered.length : rowsPerPage)));
    } catch (err) {
      setError("Error filtering documents: " + err.message);
    } finally {
      setLoading(false);
    }
  }, [documents, filters, rowsPerPage]);

  const handleRowsPerPageChange = (newSize) => {
    setRowsPerPage(newSize);
    setCurrentPage(1);
    setStartFrom(0);
  };

  if (loading) return <div className="p-4">Loading documents...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  const displayedDocuments = filteredDocuments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="flex-1 p-4" style={{ position: "absolute" }}>
      <div className="flex justify-between items-center mb-4">
        <div className="text-3xl font-bold mb-4">Assigned Documents</div>
        <div className="flex justify-between items-center" style={{position: "relative", paddingRight: "20px"}}>
          <button
            className="w-full flex items-center p-3 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors gap-2"
            onClick={() => navigate("/add-document")}
          >
            <span className="text-xl font-bold">+</span>
            <span>Add Document</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-4 font-sans rounded-2xl flex-1 flex flex-col">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-7">
          <input 
            className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px]" 
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search by name or description" 
          />
          <input 
            className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px]" 
            type="text"
            name="metaTags"
            value={filters.metaTags}
            onChange={handleFilterChange}
            placeholder="Search by meta tags" 
          />
          <select
            className={`border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px] appearance-none bg-no-repeat bg-[right_0.75rem_center] ${filters.category ? 'text-black' : 'text-gray-400'}`}
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">Select Category</option>
            <option>fin</option>
            <option>hr</option>
            <option>eng</option>
            <option>mkt</option>
          </select>
          <select 
            className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px] appearance-none bg-no-repeat bg-[right_0.75rem_center] text-gray-400"
            name="storage"
            value={filters.storage}
            onChange={handleFilterChange}
          >
            <option value="">Storage</option>
            <option className="text-black">Local Disk (Backup)</option>
            <option className="text-black">Network Drive</option>
          </select>
          <select
            className={`border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px] appearance-none bg-no-repeat bg-[right_0.75rem_center] ${filters.client ? 'text-black' : 'text-gray-400'}`}
            name="client"
            value={filters.client}
            onChange={handleFilterChange}
          >
            <option value="">Select Client</option>
            <option>Client B</option>
            <option>Client C</option>
            <option>Client D</option>
          </select>
        </div>

        <hr className="mb-4" />

        {/* Table */}
        <div className="flex-1 overflow-hidden">          <div className="overflow-x-auto h-full" style={{ height: "500px" }}>
            <table className="w-full text-lg">
              <thead className="sticky top-0 bg-gray-200 z-10">
                <tr>
                  <th className="text-left py-4 px-6 pl-4">Action</th>
                  <th className="text-left py-2 px-4">Name</th>
                  <th className="text-left py-2 px-4">Document ID</th>
                  <th className="text-left py-2 px-4">Category</th>
                  <th className="text-left py-2 px-4">Storage</th>
                  <th className="text-left py-2 px-4">Description</th>
                  <th className="text-left py-2 px-4">Assigned Date</th>
                  <th className="text-left py-2 px-4">Status</th>
                  <th className="text-left py-2 px-4">Created By</th>
                </tr>
              </thead>
              <tbody className="[&_tr]:border-b [&_td]:py-2 [&_td]:px-4">
                {displayedDocuments.map((document) => (
                  <tr key={document.id}>
                    <td className="py-2 px-4">
                      <Action variant=""/>
                    </td>
                    <td className="truncate max-w-[200px] text-blue-500">{document.name}</td>
                    <td className="truncate max-w-[200px]">{document.documentId}</td>
                    <td className="truncate max-w-[200px]">{document.category}</td>
                    <td className="truncate max-w-[200px]">{document.storage}</td>
                    <td className="truncate max-w-[200px]">{document.description}</td>
                    <td className="truncate max-w-[200px]">{document.assignedDate}</td>
                    <td className="truncate max-w-[200px]">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        document.status === 'Assigned' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {document.status}
                      </span>
                    </td>
                    <td className="truncate max-w-[200px]">{document.createdBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm bg-gray-200">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            rowsPerPage={rowsPerPage}
            startFrom={startFrom}
            setStartFrom={setStartFrom}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
          <div className="px-4 text-gray-600">
            Total Documents: {totalDocuments}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedDocuments;
