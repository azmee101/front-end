import React, { useState, useEffect } from "react";
import Pagination from "./component/layout/pagination_component";
import Action from "./component/layout/Action";

const AssignedDocuments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [startFrom, setStartFrom] = useState(0);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    metaTags: "",
    category: "",
    storage: "",
    client: ""
  });

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apply filters to documents
  useEffect(() => {
    if (!documents.length) return;

    try {
      setLoading(true);
      let filtered = [...documents];
      let hasActiveFilters = false;

      // Search filter
      if (filters.search) {
        hasActiveFilters = true;
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(doc => 
          doc.name?.toLowerCase().includes(searchLower) ||
          doc.description?.toLowerCase().includes(searchLower)
        );
      }

      // Meta tags filter
      if (filters.metaTags) {
        hasActiveFilters = true;
        const tagsLower = filters.metaTags.toLowerCase();
        filtered = filtered.filter(doc =>
          doc.tags?.toLowerCase().includes(tagsLower)
        );
      }

      // Category filter
      if (filters.category) {
        hasActiveFilters = true;
        filtered = filtered.filter(doc =>
          doc.category === filters.category
        );
      }

      // Storage filter
      if (filters.storage) {
        hasActiveFilters = true;
        filtered = filtered.filter(doc =>
          doc.storage === filters.storage
        );
      }

      // Client filter
      if (filters.client) {
        hasActiveFilters = true;
        filtered = filtered.filter(doc =>
          doc.client === filters.client
        );
      }

      setFilteredDocuments(filtered);
      // Use totalDocuments for pagination when no filters are active
      // Use filtered.length when filters are being used
      setTotalPages(Math.ceil((hasActiveFilters ? filtered.length : totalDocuments) / rowsPerPage));
    } catch (err) {
      setError("Error filtering documents: " + err.message);
    } finally {
      setLoading(false);
    }
  }, [documents, filters, rowsPerPage, totalDocuments]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3001/documents?_start=${startFrom}&_limit=${rowsPerPage}`
        );
  
        if (!response.ok) throw new Error("Failed to fetch documents");
        
        const total = response.headers.get("X-Total-Count");
        const data = await response.json();
  
        setTotalDocuments(Number(total));
        setDocuments(data);
        setTotalPages(Math.ceil(Number(total) / rowsPerPage));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDocuments();
  }, [currentPage, rowsPerPage, startFrom]);

  if (loading) return <div className="p-4">Loading documents...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  // Get current page of filtered documents
  const currentDocuments = filteredDocuments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="flex-1 p-4">
      <div className="text-3xl font-bold mb-4">Assign Documents</div>
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
          <select            className={`border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px] appearance-none bg-no-repeat bg-[right_0.75rem_center] ${filters.category ? 'text-black' : 'text-gray-400'}`}
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
          <select            className={`border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px] appearance-none bg-no-repeat bg-[right_0.75rem_center] ${filters.client ? 'text-black' : 'text-gray-400'}`}
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
                {currentDocuments.map((document) => (
                  <tr key={document.id}>                    <td className="py-2 px-4">
                      <Action />
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

export default AssignedDocuments;
