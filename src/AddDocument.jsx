import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "./utility/userUtils";

const AddDocument = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { rowData, mode } = location.state || {};
  const isAssignMode = mode === "assign";
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCancellation, setShowCancellation] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [formData, setFormData] = useState({
    documentUpload: null,
    reference: rowData?.refno || "",
    name: "",
    category: "",
    storage: "Local Disk (Default)",
    description: "",
    metaTags: [""],
    assignedTo: "",
    assignedBy: "",
  });

  // Set reference ID when rowData changes
  useEffect(() => {
    if (rowData?.refno) {
      setFormData((prev) => ({
        ...prev,
        reference: rowData.refno,
      }));
    }
  }, [rowData]);

  useEffect(() => {
    if (rowData) {
      setFormData((prev) => ({
        ...prev,
        reference: rowData.refno || "",
      }));
    }
  }, [rowData]);

  const [errors, setErrors] = useState({
    documentUpload: "",
    name: "",
    category: "",
    description: "",
  });
  const handleFileChange = (e) => {
    // Just store the file info in state, we won't actually upload it
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        documentUpload: file,
      });
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  const handleMetaTagsChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      metaTags: [...prevData.metaTags, ""],
    }));
  };

  const handleMetaTagInput = (index, value) => {
    setFormData((prevData) => {
      const newMetaTags = [...prevData.metaTags];
      newMetaTags[index] = value;
      return {
        ...prevData,
        metaTags: newMetaTags,
      };
    });
  };

  const handleDeleteMetaTag = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      metaTags: prevData.metaTags.filter((_, i) => i !== index),
    }));
  };

  const handleError = (message) => {
    setErrorMessage(message);
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Validate category
    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    // Validate description
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    // Validate assigned fields in assign mode
    if (isAssignMode && !formData.assignedTo && !rowData?.user?.name) {
      newErrors.assignedTo = "Assigned To is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const currentUser = getCurrentUser();
        if (!currentUser) {
          throw new Error("No user is logged in");
        } // Create document data with file path
        const documentId = Date.now().toString();
        const fileName = formData.documentUpload
          ? formData.documentUpload.name
          : "document.pdf";
        const filePath = `/assets/assignDocuments/${documentId}_${fileName}`;

        let newDocument = {
          id: documentId,
          documentId: Math.floor(Math.random() * 10000).toString(),
          name: formData.name,
          fileName: `${documentId}_${fileName}`,
          originalName: fileName,
          fileType: formData.documentUpload
            ? formData.documentUpload.type
            : "application/pdf",
          fileSize: formData.documentUpload ? formData.documentUpload.size : 0,
          category: formData.category,
          storage: formData.storage,
          description: formData.description,
          metaTags: formData.metaTags.filter((tag) => tag.trim() !== ""),
          filePath: filePath,
          reference: formData.reference,
          assignedDate: new Date().toLocaleDateString(),
          status: "Assigned",
          createdBy: currentUser.username,
          createdById: currentUser.user_id,
          assignedTo: "",
          assignedToId: "",
        };

        // First, fetch and update the original document's status if we have a reference
        if (formData.reference) {
          try {
            const documentsResponse = await fetch(
              "http://localhost:3001/documents"
            );
            const documents = await documentsResponse.json();
            const documentToUpdate = documents.find(
              (doc) => doc.refno === formData.reference
            );
            newDocument.assignedTo = documentToUpdate.createdBy;
            newDocument.assignedToId = documentToUpdate.createdById;

            if (documentToUpdate) {
              const updateResponse = await fetch(
                `http://localhost:3001/documents/${documentToUpdate.id}`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    status: "Uploaded",
                  }),
                }
              );

              if (!updateResponse.ok) {
                console.error("Failed to update document status");
              }
            }
          } catch (error) {
            console.error("Error updating document status:", error);
          }
        }

        // Then save the new assigned document
        const saveResponse = await fetch(
          "http://localhost:3001/assignedDocuments",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newDocument),
          }
        );

        if (!saveResponse.ok) {
          const errorText = await saveResponse.text();
          throw new Error(errorText || "Failed to save in assignDocuments");
        }

        let copyOfNewDocument = {
          id: documentId,
          documentId: Math.floor(Math.random() * 10000).toString(),
          name: formData.name,
          fileName: `${documentId}_${fileName}`,
          originalName: fileName,
          fileType: formData.documentUpload
            ? formData.documentUpload.type
            : "application/pdf",
          fileSize: formData.documentUpload ? formData.documentUpload.size : 0,
          category: formData.category,
          storage: formData.storage,
          description: formData.description,
          metaTags: formData.metaTags.filter((tag) => tag.trim() !== ""),
          filePath: filePath,
          reference: formData.reference,
          assignedDate: new Date().toLocaleDateString(),
          status: "Assigned",
          createdBy: currentUser.username,
          createdById: currentUser.user_id,
          assignedTo: "",
          assignedToId: "",
        };

        if (formData.reference) {
          try {
            const documentsResponse = await fetch(
              "http://localhost:3001/documents"
            );
            const documents = await documentsResponse.json();
            const documentToUpdate = documents.find(
              (doc) => doc.refno === formData.reference
            );
            copyOfNewDocument.assignedTo = documentToUpdate.createdBy;
            copyOfNewDocument.assignedToId = documentToUpdate.createdById;

            if (documentToUpdate) {
              const updateResponse = await fetch(
                `http://localhost:3001/documents/${documentToUpdate.id}`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    status: "Uploaded",
                  }),
                }
              );

              if (!updateResponse.ok) {
                console.error("Failed to update document status");
              }
            }
          } catch (error) {
            console.error("Error updating document status:", error);
          }
        }

        const userSaveResponse = await fetch(
          "http://localhost:3001/assignedToUsers",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(copyOfNewDocument),
          }
        );

        if (!userSaveResponse.ok) {
          const errorText = await userSaveResponse.text();
          throw new Error(errorText || "Failed to save to assignedToUsers");
        }
        // Show success message
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate("/assigned-documents");
        }, 2000);
      } catch (error) {
        console.error("Error:", error);
        handleError(
          error.message || "An unexpected error occurred. Please try again."
        );
      }
    }
  };

  const handleCancel = () => {
    setShowCancellation(true);
    setTimeout(() => {
      setShowCancellation(false);
      navigate(-1); // Navigate back to previous page
    }, 2000);
  };

  // File preview handlers
  const handlePreview = () => {
    if (formData.documentUpload) {
      setPreviewFile(formData.documentUpload);
      setShowPreview(true);
    }
  };

  const closePreview = (e) => {
    if (e) e.stopPropagation();
    setShowPreview(false);
    setPreviewFile(null);
  };

  const renderPreview = () => {
    if (!previewFile) return null;

    const fileType = previewFile.type.split("/")[0];
    const fileUrl = URL.createObjectURL(previewFile);

    switch (fileType) {
      case "image":
        return (
          <img
            src={fileUrl}
            alt={previewFile.name}
            className="max-h-full max-w-full object-contain p-4"
          />
        );
      case "video":
        return (
          <video controls className="max-h-full max-w-full p-4">
            <source src={fileUrl} type={previewFile.type} />
            Your browser does not support the video tag.
          </video>
        );
      case "audio":
        return (
          <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg m-4">
            <div className="flex items-center justify-center mb-4">
              <svg
                className="w-16 h-16 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
            </div>
            <audio controls className="w-full">
              <source src={fileUrl} type={previewFile.type} />
              Your browser does not support the audio tag.
            </audio>
          </div>
        );
      case "application":
        if (previewFile.type === "application/pdf") {
          return (
            <iframe
              src={fileUrl}
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

  return (
    <div className="flex-1 p-8">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-4 right-4 flex items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <span>Document added successfully!</span>
        </div>
      )}

      {/* Cancellation Toast */}
      {showCancellation && (
        <div className="fixed top-4 right-4 flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <span>Operation cancelled. Redirecting...</span>
        </div>
      )}

      {/* Error Toast */}
      {showError && (
        <div className="fixed top-4 right-4 flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closePreview}
        >
          <div
            className="bg-white rounded-xl p-6 w-[80vw] h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 border-b pb-4">
              <h3 className="text-xl font-bold truncate flex-1 pr-4">
                {previewFile?.name}
              </h3>
              <button
                onClick={closePreview}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold hover:bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-gray-50 rounded-lg">
              <div className="h-full w-full flex justify-center items-center">
                {renderPreview()}
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Error Display */}
        {(errors.submit || errorMessage) && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
            {errors.submit || errorMessage}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Document Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Upload
            </label>
            <div className="mt-1 space-y-2">
              <input
                type="file"
                onChange={handleFileChange}
                className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid ${
                  errors.documentUpload ? "border-red-500" : "border-gray-300"
                } rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
              />
              {formData.documentUpload && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePreview}
                    className="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Preview
                  </button>
                  <span className="text-sm text-gray-500">
                    {formData.documentUpload.name} (
                    {(formData.documentUpload.size / 1024).toFixed(2)} KB)
                  </span>
                </div>
              )}
              {errors.documentUpload && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.documentUpload}
                </p>
              )}
            </div>
          </div>{" "}
          {/* Reference ID - Always shown but can be readonly */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reference ID
            </label>
            <div className="relative">
              <input
                type="text"
                name="reference"
                value={formData.reference}
                readOnly={isAssignMode}
                disabled={isAssignMode}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  isAssignMode
                    ? "border-blue-300 bg-blue-50 text-blue-800 font-medium"
                    : "border-gray-300 bg-white"
                } focus:border-blue-500 focus:ring-blue-500`}
              />
              {isAssignMode && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            {isAssignMode && (
              <p className="mt-1 text-sm text-blue-600">
                Auto-filled from the file request
              </p>
            )}
          </div>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select category</option>
              <option value="fin">Financial</option>
              <option value="hr">HR</option>
              <option value="eng">Engineering</option>
              <option value="mkt">Marketing</option>
              <option value="prd">Product</option>
              <option value="mem">Memo</option>
              <option value="prop">Proposal</option>
              <option value="sec">Security</option>
              <option value="sum">Summary</option>
              <option value="ww">Regulatory</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>{" "}
          {/* Storage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Storage
            </label>
            <select
              name="storage"
              value={formData.storage}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Local Disk (Default)">Local Disk (Default)</option>
              <option value="Cloud Storage">Cloud Storage</option>
              <option value="Network Drive">Network Drive</option>
              <option value="Local Disk (Backup)">Local Disk (Backup)</option>
            </select>
          </div>
          {/* Assigned To - Only shown in assign mode */}
          {isAssignMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assigned To
              </label>
              <input
                type="text"
                name="assignedTo"
                value={formData.assignedTo || rowData?.user?.name || ""}
                readOnly
                className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-blue-600">
                Auto-filled from the file request
              </p>
            </div>
          )}
          {/* Assigned By - Always shown but readonly */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assigned By
            </label>
            <input
              type="text"
              name="assignedBy"
              value={getCurrentUser()?.username || ""}
              readOnly
              className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <p className="mt-1 text-sm text-blue-600">Current logged-in user</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        {/* Meta Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meta Tags
          </label>
          <div className="space-y-2">
            {formData.metaTags.map((tag, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => handleMetaTagInput(index, e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter meta tag"
                />
                {formData.metaTags.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteMetaTag(index)}
                    className="inline-flex items-center p-2 text-white bg-red-600 hover:bg-red-700 rounded-lg"
                  >
                    <span className="text-xl font-bold">×</span>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleMetaTagsChange}
              className="inline-flex items-center p-2 text-white bg-green-600 hover:bg-green-700 rounded-lg"
            >
              <span className="text-xl font-bold">+</span>
              <span className="ml-1">Add Meta Tag</span>
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-start space-x-4">
          {" "}
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg"
          >
            <span className="mr-2">💾</span> Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg"
          >
            <span className="mr-2">❌</span> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDocument;
