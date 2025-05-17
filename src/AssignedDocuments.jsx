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
  const [previewFile, setPreviewFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    metaTags: "",
    category: "",
    storage: "",
    client: ""
  });

  const handlePreview = async (document) => {
    try {
      const response = await fetch(`http://localhost:3001${document.filePath}`);
      const blob = await response.blob();
      const file = new File([blob], document.name, { type: document.fileType });
      const fileUrl = URL.createObjectURL(file);
      
      setPreviewFile({
        ...document,
        url: fileUrl,
        type: document.fileType
      });
      setShowPreview(true);
    } catch (err) {
      console.error('Error fetching file:', err);
    }
  };

  useEffect(() => {
    return () => {
      if (previewFile?.url) {
        URL.revokeObjectURL(previewFile.url);
      }
    };
  }, [previewFile]);

  const renderPreview = () => {
    if (!previewFile) return null;
    const fileType = previewFile.type.split('/')[0];

    switch (fileType) {
      case 'image':
        return <img src={previewFile.url} alt={previewFile.name} className="max-h-full max-w-full object-contain p-4" />;
      case 'application':
        if (previewFile.type === 'application/pdf') {
          return (
            <iframe
              src={previewFile.url}
              title={previewFile.name}
              className="w-full h-full border-0 p-2"
            />
          );
        }
        return <p className="text-gray-600">Preview not available for this file type</p>;
      default:
        return <p className="text-gray-600">Preview not available for this file type</p>;
    }
  };

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const currentUser = getCurrentUser();
      
      if (!currentUser) {
        navigate("/");
        return;
      }

      const response = await fetch('http://localhost:3001/assignedToUsers');
      if (!response.ok) throw new Error("Failed to fetch assigned documents");
      
      const allDocuments = await response.json();
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

  useEffect(() => {
    if (!documents.length) return;

    try {
      setLoading(true);
      let filtered = [...documents];
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(doc => 
          doc.name?.toLowerCase().includes(searchLower) ||
          doc.description?.toLowerCase().includes(searchLower) ||
          doc.documentId?.toString().includes(searchLower)
        );
      }

      if (filters.metaTags) {
        const tagsLower = filters.metaTags.toLowerCase();
        filtered = filtered.filter(doc =>
          doc.metaTags?.some(tag => tag.toLowerCase().includes(tagsLower))
        );
      }

      if (filters.category) {
        filtered = filtered.filter(doc =>
          doc.category === filters.category
        );
      }

      if (filters.storage) {
        filtered = filtered.filter(doc =>
          doc.storage === filters.storage
        );
      }

      setFilteredDocuments(filtered);
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
    <div className="flex-1 p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h1 className="text-2xl md:text-2xl font-bold">Assigned Documents</h1>
        <button
          className="w-full md:w-auto flex items-center justify-center p-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          onClick={() => navigate("/add-document")}
        >
          <span className="text-xl font-bold">+</span>
          <span>Add Document</span>
        </button>
      </div>

      <div className="bg-white p-3 rounded-xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
          <input 
            className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full" 
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search by name or description" 
          />
          <input 
            className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full" 
            type="text"
            name="metaTags"
            value={filters.metaTags}
            onChange={handleFilterChange}
            placeholder="Search by meta tags" 
          />
          <select
            className={`border border-gray-300 rounded-lg px-4 py-2 text-base w-full ${filters.category ? 'text-black' : 'text-gray-400'}`}
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
            className="border border-gray-300 rounded-lg px-4 py-2 text-base w-full"
            name="storage"
            value={filters.storage}
            onChange={handleFilterChange}
          >
            <option value="">Storage</option>
            <option className="text-black">Local Disk (Backup)</option>
            <option className="text-black">Network Drive</option>
          </select>
          <select
            className={`border border-gray-300 rounded-lg px-4 py-2 text-base w-full ${filters.client ? 'text-black' : 'text-gray-400'}`}
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

        <div className="overflow-x-auto" style={{ minHeight: '400px', maxHeight: '70vh' }}>
          <table className="w-full text-base">
            <thead className="sticky top-0 bg-gray-50 z-10">
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 min-w-[120px]">Action</th>
                <th className="text-left py-3 px-4 min-w-[200px]">Name</th>
                <th className="text-left py-3 px-4 min-w-[150px]">Document ID</th>
                <th className="text-left py-3 px-4 min-w-[120px]">Category</th>
                <th className="text-left py-3 px-4 min-w-[150px]">Storage</th>
                <th className="text-left py-3 px-4 min-w-[250px]">Description</th>
                <th className="text-left py-3 px-4 min-w-[150px]">Assigned Date</th>
                <th className="text-left py-3 px-4 min-w-[120px]">Status</th>
                <th className="text-left py-3 px-4 min-w-[150px]">Created By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayedDocuments.map((document) => (
                <tr key={document.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4">
                    <Action variant=""/>
                  </td>
                  <td className="py-2 px-4 max-w-[200px] truncate">
                    <button
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      onClick={() => handlePreview(document)}
                    >
                      {document.name}
                    </button>
                  </td>
                  <td className="py-2 px-4 truncate">{document.documentId}</td>
                  <td className="py-2 px-4 truncate">{document.category}</td>
                  <td className="py-2 px-4 truncate">{document.storage}</td>
                  <td className="py-2 px-4 truncate">{document.description}</td>
                  <td className="py-2 px-4 truncate">{document.assignedDate}</td>
                  <td className="py-2 px-4 truncate">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      document.status === 'Assigned' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {document.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 truncate">{document.createdBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-1 gap-4 bg-gray-200">
          <div className="text-sm text-gray-600 order-2 md:order-1">
            Total Documents: {totalDocuments}
          </div>
          <div className="order-1 md:order-2 w-full md:w-auto">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              rowsPerPage={rowsPerPage}
              startFrom={startFrom}
              setStartFrom={setStartFrom}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </div>
        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl mx-4 h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">{previewFile?.name}</h2>
              <button
                className="text-gray-500 hover:text-gray-700 text-2xl"
                onClick={() => setShowPreview(false)}
              >
                ×
              </button>
            </div>
            <div className="h-full">
              {renderPreview()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedDocuments;