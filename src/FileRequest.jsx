import React, { useState, useEffect } from "react";
import Pagination from "./component/layout/pagination_component";
import { useNavigate } from "react-router-dom";
import Action from "./component/layout/Action";

const FileRequest = () => {
  const navigate = useNavigate();
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
        const total = response.headers.get("X-Total-Count");
        console.log("toto", total);
        const data = await response.json();
        setTotalPages(Number(total) / rowsPerPage);
        setTotalDocuments(Number(total));
        setDocuments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [currentPage, rowsPerPage, startFrom, totalDocuments]);

  if (loading) return <div className="p-4">Loading documents...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="flex-1 p-4" style={{ position: "absolute" }}>
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
        {/* Filters remain unchanged */}

        {/* <hr className="mb-4" /> */}

        {/* Updated Table Structure */}
        <div className="flex-1" style={{ width: "90%" }}>
          <div className="overflow-x-auto h-full" style={{ height: "500px" }}>
            <table className="w-full text-lg table-auto border-collapse">
              <thead className="sticky top-0 bg-gray-200 z-10">
                <tr>
                  <th className="text-left py-4 px-6 pl-4">Action</th>
                  <th className="text-left py-2 px-4">Subject</th>
                  <th className="text-left py-2 px-4">Email</th>
                  <th className="text-left py-2 px-4">
                    Maximum File Size Upload
                  </th>
                  <th className="text-left py-2 px-4">
                    Maximum Document Upload
                  </th>
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
                      <Action />
                    </td>
                    <td className="truncate max-w-[200px] text-blue-500">
                      {document.subject}
                    </td>
                    <td className="truncate max-w-[200px]">{document.email}</td>
                    <td className="truncate max-w-[200px]">
                      {document.maxFileSize}
                    </td>
                    <td className="truncate max-w-[200px]">
                      {document.maxDocuments}
                    </td>
                    <td className="truncate max-w-[200px]">
                      {document.allowedExtensions}
                    </td>
                    <td className="truncate max-w-[200px]">
                      <span
                        className={` ${
                          document.status === "Created"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      <span
                        className={`${
                          document.status === "Created"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {document.status}
                      </span>
                    </td>
                    <td className="truncate max-w-[200px]">
                      {document.createdBy}
                    </td>
                    <td className="truncate max-w-[200px]">
                      {document.createdDate}
                    </td>
                    <td className="truncate max-w-[200px] text-red-500">
                      {document.linkExpiration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination remains unchanged */}
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

export default FileRequest;
