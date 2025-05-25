import React, { useState, useEffect, useCallback } from "react";
import Pagination from "./component/layout/pagination_component";
import Action from "./component/layout/Action";

const AllDocuments = () => {
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
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handlePreview = async (document) => {
    try {
      const response = await fetch(`http://localhost:3001${document.filePath}`);
      const blob = await response.blob();
      const file = new File([blob], document.name, { type: document.fileType });
      const fileUrl = URL.createObjectURL(file);

      setPreviewFile({
        ...document,
        url: fileUrl,
        type: document.fileType,
      });
      setShowPreview(true);
    } catch (err) {
      console.error("Error fetching file:", err);
    }
  };

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch both regular documents
      const response = await fetch("http://localhost:3001/assignedDocuments");

      const assignedDocs = await response.json();

      // Add a type flag to distinguish between regular and assigned documents

      const allDocs = assignedDocs.map((doc) => ({
        id: doc.id,
        name: doc.name || doc.name,
        category: doc.category || "-",
        storage: doc.storage || "-",
        client: "-",
        createdDate: doc.assignedDate,
        expiredDate: "-",
        assignedTo: doc.assignedTo,
        docType: "assigned",
        reference: doc.reference,
        filePath: doc.filePath,
        fileType: doc.fileType,
      }));

      // Combine both types of documents
      // const allDocs = [...processedRegularDocs, ...processedAssignedDocs];
      const total = allDocs.length;
      setTotalDocuments(total);

      // Handle pagination
      const processedData =
        rowsPerPage === Infinity
          ? allDocs
          : allDocs.slice(startFrom, startFrom + rowsPerPage);
      setDocuments(processedData);
      setFilteredDocuments(processedData);
      setTotalPages(
        Math.ceil(total / (rowsPerPage === Infinity ? total : rowsPerPage))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [startFrom, rowsPerPage]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  useEffect(() => {
    return () => {
      if (previewFile?.url) {
        URL.revokeObjectURL(previewFile.url);
      }
    };
  }, [previewFile]);

  const renderPreview = () => {
    if (!previewFile) return null;
    const fileType = previewFile.type.split("/")[0];

    switch (fileType) {
      case "image":
        return (
          <img
            src={previewFile.url}
            alt={previewFile.name}
            className="max-h-full max-w-full object-contain p-4"
          />
        );
      case "application":
        if (previewFile.type === "application/pdf") {
          return (
            <iframe
              src={previewFile.url}
              title={previewFile.name}
              className="w-full h-full border-0 p-2"
            />
          );
        }
        return (
          <p className="text-gray-600">
            Preview not available for this file type
          </p>
        );
      default:
        return (
          <p className="text-gray-600">
            Preview not available for this file type
          </p>
        );
    }
  };

  useEffect(() => {
    if (!documents.length) return;

    let filtered = [...documents];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (doc) =>
          doc.name?.toLowerCase().includes(searchLower) ||
          doc.description?.toLowerCase().includes(searchLower)
      );
    }

    if (filters.metaTags) {
      const tagsLower = filters.metaTags.toLowerCase();
      filtered = filtered.filter((doc) =>
        doc.tags?.toLowerCase().includes(tagsLower)
      );
    }

    if (filters.category) {
      filtered = filtered.filter((doc) => doc.category === filters.category);
    }

    if (filters.storage) {
      filtered = filtered.filter((doc) => doc.storage === filters.storage);
    }

    if (filters.client) {
      filtered = filtered.filter((doc) => doc.client === filters.client);
    }


    setFilteredDocuments(filtered);
    setTotalPages(Math.ceil(filtered.length / rowsPerPage));
  }, [documents, filters, rowsPerPage]);

  const handleRowsPerPageChange = (newSize) => {
    setRowsPerPage(newSize);
    setCurrentPage(1);
    setStartFrom(0);
  };

  if (loading) return <div className="p-4">Loading documents...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  const currentDocuments = filteredDocuments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="flex-1 p-1">
      <div className="text-2xl font-bold mb-2">All Documents</div>
      <div className="bg-white p-3 font-sans rounded-2xl flex-1 flex flex-col">
        <div className="flex flex-wrap gap-3 mb-6">
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
            className={`border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px] appearance-none bg-no-repeat bg-[right_0.75rem_center] ${
              filters.category ? "text-black" : "text-gray-400"
            }`}
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
            className={`border border-gray-300 rounded-lg px-4 py-2 text-base w-full md:w-[250px] appearance-none bg-no-repeat bg-[right_0.75rem_center] ${
              filters.category ? "text-black" : "text-gray-400"
            }`}
            name="storage"
            value={filters.storage}
            onChange={handleFilterChange}
          >
            <option value="">Storage</option>
            <option>Local Disk (Default)</option>
            <option>Amazon S3</option>
          </select>
        </div>

        <hr className="mb-0" />

        <div className="flex-1 overflow-hidden">
          <div className="overflow-x-auto h-full" style={{ height: "450px" }}>
            <table className="w-full text-lg">
              <thead className="sticky top-0 bg-gray-200 z-10 w-min">
                <tr>
                  <th className="text-left text-sm px-2 py-1 whitespace-nowrap">
                    Action
                  </th>
                  <th className="text-left text-sm px-2 py-1 whitespace-nowrap">
                    Name
                  </th>
                  <th className="text-left text-sm px-2 py-1 whitespace-nowrap">
                    Category Name
                  </th>
                  <th className="text-left text-sm px-2 py-1 whitespace-nowrap">
                    Storage
                  </th>
                  <th className="text-left text-sm px-2 py-1 whitespace-nowrap">
                    Created Date ↓
                  </th>
                  <th className="text-left text-sm px-2 py-1 whitespace-nowrap">
                    Assigned To
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr]:border-b [&_td]:py-2 [&_td]:px-4">
                {" "}
                {currentDocuments.map((document) => (
                  <tr
                    key={document.id}
                    className={`${
                      document.docType === "assigned" ? "bg-blue-50" : ""
                    } text-sm leading-tight`}
                  >
                    <td className="py-1 px-4">
                      <Action variant="AllDocuments" />
                    </td>
                    <td className="truncate max-w-[200px] py-1 px-4">
                      <a
                        href={`http://localhost:5173${document.filePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-sm"
                      >
                        {document.name}
                      </a>
                    </td>
                    <td className="truncate max-w-[200px] py-1 px-4">
                      {document.category}
                    </td>
                    <td className="truncate max-w-[200px] py-1 px-4">
                      {document.storage}
                    </td>
                    <td className="truncate max-w-[200px] py-1 px-4">
                      {document.createdDate}
                    </td>
                    <td className="truncate max-w-[200px] py-1 px-4">
                      {document.assignedTo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2 text-sm bg-gray-200">
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

export default AllDocuments;
