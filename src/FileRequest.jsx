import React, { useState, useEffect, useCallback } from "react";
import Pagination from "./component/layout/pagination_component";
import { useNavigate } from "react-router-dom";
import Action from "./component/layout/Action";
import { getCurrentUser, isAdmin } from "./utility/userUtils";

// Custom hook for debouncing
const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

const FileRequest = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(Infinity);
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [startFrom, setStartFrom] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    extension: "",
    dateFrom: "",
    dateTo: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [notification, setNotification] = useState({
    message: "",
    type: ""
  });
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  const showNotification = useCallback((message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  }, [setNotification]);

  const applyFilters = useCallback((docs) => {
    if (!docs) return;
    
    let filtered = [...docs];

    // Apply smart search across multiple fields
    if (filters.search && filters.search.length >= 3) {
      const searchTerms = filters.search.toLowerCase().split(' ').filter(term => term.length > 0);
      
      filtered = filtered.filter(doc => {
        // Create a searchable text from all relevant fields
        const searchableText = [
          doc.subject,
          doc.refno,
          doc.email,
          doc.createdBy,
          doc.category,
          doc.status,
          doc.maxFileSize,
          doc.maxDocuments,
          doc.allowedExtensions?.join(','),
          doc.createdDate,
          doc.linkExpiration
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        // Check if all search terms are found in the searchable text
        return searchTerms.every(term => searchableText.includes(term));
      });
    }

    // Apply status filter (keep this separate as it's a dropdown)
    if (filters.status) {
      filtered = filtered.filter(doc => doc.status === filters.status);
    }

    // Apply file extension filter (keep this separate as it's a dropdown)
    if (filters.extension) {
      filtered = filtered.filter(doc => 
        doc.allowedExtensions.some(ext => ext.includes(filters.extension))
      );
    }

    // Apply date range filter
    if (filters.dateFrom || filters.dateTo) {
      filtered = filtered.filter(doc => {
        const docDate = new Date(doc.createdDate);
        const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null;
        const toDate = filters.dateTo ? new Date(filters.dateTo) : null;

        if (fromDate && toDate) {
          return docDate >= fromDate && docDate <= toDate;
        } else if (fromDate) {
          return docDate >= fromDate;
        } else if (toDate) {
          return docDate <= toDate;
        }
        return true;
      });
    }

    const total = filtered.length;
    setTotalDocuments(total);

    // Handle pagination
    const startIndex = startFrom;
    const endIndex = rowsPerPage === Infinity ? total : startFrom + rowsPerPage;
    setFilteredDocuments(filtered.slice(startIndex, endIndex));
    
    // Calculate total pages with simplified logic
    const effectiveRowsPerPage = rowsPerPage === Infinity ? total : rowsPerPage;
    setTotalPages(Math.ceil(total / effectiveRowsPerPage));
  }, [filters, startFrom, rowsPerPage]);

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const currentUser = getCurrentUser();
      
      if (!currentUser) {
        navigate("/");
        return;
      }

      const countResponse = await fetch("http://localhost:3001/documents");
      const allDocuments = await countResponse.json();

      // Filter documents based on user role
      const userDocs = allDocuments.filter(
        (doc) => doc.createdById === currentUser.user_id.toString()
      );

      setDocuments(userDocs);
      applyFilters(userDocs); // Apply filters to the fetched documents
    } catch (err) {
      showNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  }, [navigate, applyFilters, showNotification]);

  useEffect(() => {
    const checkUserRole = () => {
      setIsUserAdmin(isAdmin());
    };
    checkUserRole();
  }, []);

  // Effect for initial document fetch
  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  // Effect for filtering when documents or filters change
  useEffect(() => {
    if (documents.length > 0) {
      applyFilters(documents);
    }
  }, [documents, filters, applyFilters]);

  // Effect for updating filters when debounced search changes
  useEffect(() => {
    if (debouncedSearchTerm.length === 0 || debouncedSearchTerm.length >= 3) {
      setFilters(prev => ({
        ...prev,
        search: debouncedSearchTerm
      }));
    }
  }, [debouncedSearchTerm]);

  const handleDocumentDelete = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/documents/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete document");
      }

      showNotification("Document deleted successfully", "success");
      // Update local state to remove the deleted document
      setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
    } catch (err) {
      showNotification(err.message, "error");
      console.error("Delete error:", err);
    }
  }, [showNotification, setDocuments]);

  const handleRowsPerPageChange = (newSize) => {
    setRowsPerPage(newSize);
    setCurrentPage(1);
    setStartFrom(0);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'search') {
      setSearchTerm(value);
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setCurrentPage(1);
    setStartFrom(0);
  };

  if (loading) return <div className="p-4">Loading documents...</div>;

  return (
    <div className="flex-1 p-4 overflow-hidden h-full">
      {notification.message && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center px-4 py-3 rounded ${
            notification.type === "success"
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
        >
          <span>{notification.message}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <div className="text-3xl font-bold">{isUserAdmin ? "All File Requests" : "My File Requests"}</div>
        <div className="flex justify-end">
          <button
            className="flex items-center p-3 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors gap-2"
            onClick={() => navigate("/add-file-request")}
          >
            <span className="text-xl font-bold">+</span>
            <span>Add File Request</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-4 mb-4 rounded-lg shadow">
        <div className="mb-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Smart Search</label>
            <div className="relative">
              <input
                type="text"
                name="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Type at least 3 characters to search..."
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
              {searchTerm.length > 0 && searchTerm.length < 3 && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                  {3 - searchTerm.length} more character{searchTerm.length === 2 ? '' : 's'} needed
                </div>
              )}
            </div>
            <div className="mt-1 text-sm text-gray-500">
              Search by reference ID, subject, email, status, category, created by
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="Created">Created</option>
              <option value="Pending">Pending</option>
              <option value="Uploaded">Uploaded</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File Type</label>
            <select
              name="extension"
              value={filters.extension}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All File Types</option>
              <option value="pdf">PDF</option>
              <option value="doc">DOC</option>
              <option value="jpg">Images</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <div className="flex gap-2">
              <input
                type="date"
                name="dateFrom"
                value={filters.dateFrom}
                onChange={handleFilterChange}
                className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                name="dateTo"
                value={filters.dateTo}
                onChange={handleFilterChange}
                className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            {filteredDocuments.length} results found
          </div>
          <button
            onClick={() => {
              setFilters({
                search: "",
                status: "",
                extension: "",
                dateFrom: "",
                dateTo: ""
              });
              setSearchTerm("");
              setCurrentPage(1);
              setStartFrom(0);
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Clear Filters</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-4 font-sans rounded-2xl flex flex-col h-[calc(100vh-280px)]">
        <div className="flex-1 min-h-0">
          <div className="overflow-x-auto overflow-y-auto h-full">
            <table className="w-full text-lg table-auto border-collapse">
              <thead className="sticky top-0 bg-gray-200 z-10">
                <tr>
                  <th className="text-left py-4 px-6 pl-4">Action</th>
                  <th className="text-left py-2 px-4">Reference-Id</th>
                  <th className="text-left py-2 px-4">Subject</th>
                  <th className="text-left py-2 px-4">Email</th>
                  {isUserAdmin && (
                    <>
                      <th className="text-left py-2 px-4">Maximum File Size Upload</th>
                      <th className="text-left py-2 px-4">Maximum Document Upload</th>
                      <th className="text-left py-2 px-4">Allow File Extension</th>
                      <th className="text-left py-2 px-4">Created By</th>
                    </>
                  )}
                  <th className="text-left py-2 px-4">Status</th>
                  <th className="text-left py-2 px-4">Created Date</th>
                  <th className="text-left py-2 px-4">Link expiration</th>
                </tr>
              </thead>
              <tbody className="[&_tr]:border-b [&_td]:py-2 [&_td]:px-4">
                {filteredDocuments.map((document) => (
                  <tr key={document.id}>
                    <td className="py-2 px-4">
                      <Action
                        variant="fileRequest"
                        rowData={document}
                        onDelete={() => handleDocumentDelete(document.id)}
                      />
                    </td>
                    <td className="truncate max-w-[200px]">{document.refno}</td>
                    <td className="truncate max-w-[200px] text-blue-500">
                      {document.subject}
                    </td>
                    <td className="truncate max-w-[200px]">{document.email}</td>
                    {isUserAdmin && (
                      <>
                        <td className="truncate max-w-[200px]">{document.maxFileSize}</td>
                        <td className="truncate max-w-[200px]">{document.maxDocuments}</td>
                        <td className="truncate max-w-[200px]">{document.allowedExtensions}</td>
                        <td className="truncate max-w-[200px]">{document.createdBy}</td>
                      </>
                    )}
                    <td className="truncate max-w-[200px]">
                      <span className={`flex items-center gap-2`}>
                        <span
                          className={`h-2 w-2 rounded-full ${
                            document.status === "Uploaded" ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></span>
                        <span
                          className={`${
                            document.status === "Uploaded" ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {document.status}
                        </span>
                      </span>
                    </td>
                    <td className="truncate max-w-[200px]">{document.createdDate}</td>
                    <td className="truncate max-w-[200px] text-red-500">
                      {document.linkExpiration}
                    </td>
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

export default FileRequest;
