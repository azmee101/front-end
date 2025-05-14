import React, { useState, useEffect, useCallback } from "react";
import Pagination from "./component/layout/pagination_component";
import Action from "./component/layout/Action";

const PendingFileRequest = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [documents, setDocuments] = useState([]);
  const [displayedDocuments, setDisplayedDocuments] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Individual filter states for better performance
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    // Update the appropriate filter
    switch (name) {
      case 'name':
        setNameFilter(value);
        break;
      case 'category':
        setCategoryFilter(value);
        break;
      case 'createdDate':
        setDateFilter(value);
        break;
    }
  };

  const filterDocuments = useCallback((docs) => {
    if (!docs) return [];
    
    return docs.filter(doc => {
      // Name filter (checks both subject and reference ID)
      const nameMatch = !nameFilter || 
        doc.subject?.toLowerCase().includes(nameFilter.toLowerCase()) ||
        doc.refno?.toLowerCase().includes(nameFilter.toLowerCase());

      // Category filter
      const categoryMatch = !categoryFilter || 
        doc.category?.toLowerCase().includes(categoryFilter.toLowerCase());

      // Date filter
      const dateMatch = !dateFilter || doc.createdDate.includes(dateFilter);

      return nameMatch && categoryMatch && dateMatch;
    });
  }, [nameFilter, categoryFilter, dateFilter]);

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/documents');
      if (!response.ok) throw new Error("Failed to fetch documents");
      
      const allDocuments = await response.json();
      const pendingDocs = allDocuments.filter(doc => doc.status === "Created");
      setDocuments(pendingDocs);
      setTotalDocuments(pendingDocs.length);
      
      // Apply initial filtering
      const filtered = filterDocuments(pendingDocs);
      setDisplayedDocuments(filtered.slice(0, rowsPerPage));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [rowsPerPage, filterDocuments]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  // Update displayed documents when filters change
  useEffect(() => {
    const filtered = filterDocuments(documents);
    setDisplayedDocuments(
      rowsPerPage === Infinity ? filtered : filtered.slice(0, rowsPerPage)
    );
  }, [documents, rowsPerPage, filterDocuments]);

  const handleRowsPerPageChange = (newSize) => {
    setRowsPerPage(newSize);
  };

  if (loading) return <div className="p-4">Loading documents...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="flex-1 p-4">
      <div className="text-3xl font-bold mb-4">File Request Pending List</div>
      
      {/* Filter section */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={nameFilter}
              onChange={handleFilterChange}
              placeholder="Search by name..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={categoryFilter}
              onChange={handleFilterChange}
              placeholder="Filter by category..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Created Date</label>
            <input
              type="date"
              name="createdDate"
              value={dateFilter}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 font-sans rounded-2xl flex-1 flex flex-col">
        <div className="flex-1 overflow-hidden">
          <div className="overflow-y-auto" style={{ height: "calc(100vh - 250px)" }}>
            <table className="w-full text-lg">              <thead className="sticky top-0 bg-gray-200 z-10">
                <tr>
                  <th className="text-left py-4 px-6 pl-4">Action</th>
                  <th className="text-left py-2 px-4">Reference-Id</th>
                  <th className="text-left py-2 px-4">Name</th>
                  <th className="text-left py-2 px-4">Category Name</th>
                  <th className="text-left py-2 px-4">Storage</th>
                  <th className="text-left py-2 px-4">Created Date</th>
                  <th className="text-left py-2 px-4">Status</th>
                  <th className="text-left py-2 px-4">Expired Date</th>
                </tr>
              </thead>
              <tbody className="[&_tr]:border-b [&_td]:py-2 [&_td]:px-4">
                {displayedDocuments.map((document) => (
                  <tr key={document.id}>
                    <td className="py-2 px-4">
                      <Action variant="PendingFileRequest" rowData={document} />
                    </td>
                    <td className="truncate max-w-[150px] font-mono text-gray-600">{document.refno}</td>
                    <td className="truncate max-w-[200px] text-blue-500">{document.subject}</td>
                    <td className="truncate max-w-[200px]">{document.category}</td>
                    <td className="truncate max-w-[200px]">{document.storage}</td>
                    <td className="truncate max-w-[200px]">{document.createdDate}</td>
                    <td className="truncate max-w-[200px]">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span className="text-green-500">Created</span>
                      </span>
                    </td>
                    <td className="truncate max-w-[200px] text-red-500">{document.linkExpiration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 p-4 bg-gray-100 rounded-lg">
          <Pagination
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
          <div className="text-gray-600">
            Total Documents: {totalDocuments}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingFileRequest;
