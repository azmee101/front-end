import React, { useState, useEffect, useCallback } from "react";
import Pagination from "./component/layout/pagination_component";
import { useNavigate } from "react-router-dom";
import Action from "./component/layout/Action";

const FileRequest = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [documents, setDocuments] = useState([]);
  const [startFrom, setStartFrom] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      // First get total count
      const countResponse = await fetch('http://localhost:3001/documents');
      const allDocuments = await countResponse.json();
      const total = allDocuments.length;
      setTotalDocuments(total);

      // Then fetch the paginated data
      let url = `http://localhost:3001/documents`;
      if (rowsPerPage !== Infinity) {
        url += `?_start=${startFrom}&_limit=${rowsPerPage}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch documents");

      const data = await response.json();
      setDocuments(rowsPerPage === Infinity ? data : data.slice(0, rowsPerPage));
      setTotalPages(Math.ceil(total / (rowsPerPage === Infinity ? total : rowsPerPage)));
    } catch (err) {
      showNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  }, [startFrom, rowsPerPage]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const handleDocumentDelete = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/documents/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete document');
      }
      
      showNotification("Document deleted successfully", "success");
      // Update local state to remove the deleted document
      setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== id));
    } catch (err) {
      showNotification(err.message, "error");
      console.error('Delete error:', err);
    }
  }, []);

  const handleRowsPerPageChange = (newSize) => {
    setRowsPerPage(newSize);
    setCurrentPage(1);
    setStartFrom(0);
  };

  if (loading) return <div className="p-4">Loading documents...</div>;

  return (
    <div className="flex-1 p-4" style={{ position: "absolute" }}>
      {notification.message && (
        <div className={`fixed top-4 right-4 flex items-center px-4 py-3 rounded ${
          notification.type === "success" 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          <span>{notification.message}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <div className="text-3xl font-bold mb-4">File Request</div>
        <div className="flex justify-between items-center" style={{position: "relative", paddingRight: "200px"}}>
          <button
            className="w-full flex items-center p-3 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors gap-2"
            onClick={() => navigate("/add-file-request")}
          >
            <span className="text-xl font-bold">+</span>
            <span>Add File Request</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-4 font-sans rounded-2xl flex-1 flex flex-col">
        <div className="flex-1" style={{ width: "90%" }}>
          <div className="overflow-x-auto h-full" style={{ height: "500px" }}>
            <table className="w-full text-lg table-auto border-collapse">
              <thead className="sticky top-0 bg-gray-200 z-10">
                <tr>
                  <th className="text-left py-4 px-6 pl-4">Action</th>
                  <th className="text-left py-2 px-4">Reference-Id</th>
                  <th className="text-left py-2 px-4">Subject</th>
                  <th className="text-left py-2 px-4">Email</th>
                  <th className="text-left py-2 px-4">Maximum File Size Upload</th>
                  <th className="text-left py-2 px-4">Maximum Document Upload</th>
                  <th className="text-left py-2 px-4">Allow File Extension</th>
                  <th className="text-left py-2 px-4">Status</th>
                  <th className="text-left py-2 px-4">Created By</th>
                  <th className="text-left py-2 px-4">Created Date</th>
                  <th className="text-left py-2 px-4">Link expiration</th>
                </tr>
              </thead>
              <tbody className="[&_tr]:border-b [&_td]:py-2 [&_td]:px-4">
                {documents.map((document) => (
                  <tr key={document.id}>
                    <td className="py-2 px-4">
                      <Action 
                        variant="fileRequest" 
                        rowData={document}
                        onDelete={() => handleDocumentDelete(document.id)}
                      />
                    </td>
                    <td className="truncate max-w-[200px]">{document.refno}</td>
                    <td className="truncate max-w-[200px] text-blue-500">{document.subject}</td>
                    <td className="truncate max-w-[200px]">{document.email}</td>
                    <td className="truncate max-w-[200px]">{document.maxFileSize}</td>
                    <td className="truncate max-w-[200px]">{document.maxDocuments}</td>
                    <td className="truncate max-w-[200px]">{document.allowedExtensions}</td>
                    <td className="truncate max-w-[200px]">
                      <span className={`flex items-center gap-2`}>
                        <span className={`h-2 w-2 rounded-full ${
                          document.status === "Created" ? "bg-green-500" : "bg-red-500"
                        }`}></span>
                        <span className={`${
                          document.status === "Created" ? "text-green-500" : "text-red-500"
                        }`}>
                          {document.status}
                        </span>
                      </span>
                    </td>
                    <td className="truncate max-w-[200px]">{document.createdBy}</td>
                    <td className="truncate max-w-[200px]">{document.createdDate}</td>
                    <td className="truncate max-w-[200px] text-red-500">{document.linkExpiration}</td>
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
