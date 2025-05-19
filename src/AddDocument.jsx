import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const AddDocument = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { rowData, mode } = location.state || {};
  const isAssignMode = mode === 'assign';
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCancellation, setShowCancellation] = useState(false);
  const [formData, setFormData] = useState({
    documentUpload: null,
    reference: rowData?.refno || '',
    name: '',
    category: '',
    storage: 'Local Disk (Default)',
    description: '',
    metaTags: ['']
  });
  
  useEffect(() => {
    if (rowData) {
      setFormData(prev => ({
        ...prev,
        reference: rowData.refno || ''
      }));
    }
  }, [rowData]);

  const [errors, setErrors] = useState({
    documentUpload: '',
    name: '',
    category: '',
    description: ''
  });

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      documentUpload: e.target.files[0]
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  const handleMetaTagsChange = () => {
    setFormData(prevData => ({
      ...prevData,
      metaTags: [...prevData.metaTags, '']
    }));
  };

  const handleMetaTagInput = (index, value) => {
    setFormData(prevData => {
      const newMetaTags = [...prevData.metaTags];
      newMetaTags[index] = value;
      return {
        ...prevData,
        metaTags: newMetaTags
      };
    });
  };

  const handleDeleteMetaTag = (index) => {
    setFormData(prevData => ({
      ...prevData,
      metaTags: prevData.metaTags.filter((_, i) => i !== index)
    }));
  };  const handleSave = (e) => {
    e.preventDefault();
    
    const newErrors = {};

    // Validate document upload
    if (!formData.documentUpload) {
      newErrors.documentUpload = "Document upload is required";
    }

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

    setErrors(newErrors);

    // Only proceed if there are no errors
    if (Object.keys(newErrors).length === 0) {
      // Show success message
      setShowSuccess(true);
      
      // Hide success message after 2 seconds and redirect
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/assigned-documents');
      }, 2000);
    }
  };

  const handleCancel = () => {
    setShowCancellation(true);
    setTimeout(() => {
      setShowCancellation(false);
      navigate('/assigned-documents');
    }, 2000);
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

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Document Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Document Upload</label>
            <div className="mt-1">
              <input
                type="file"
                onChange={handleFileChange}
                className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid ${
                  errors.documentUpload ? 'border-red-500' : 'border-gray-300'
                } rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
              />
              {errors.documentUpload && (
                <p className="mt-1 text-sm text-red-600">{errors.documentUpload}</p>
              )}
            </div>
          </div>

          {/* Reference ID - Only shown in assign mode */}
          {isAssignMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reference ID</label>
              <input
                type="text"
                name="reference"
                value={formData.reference}
                readOnly
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.category ? 'border-red-500' : 'border-gray-300'
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
          </div>

          {/* Storage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Storage</label>
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
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        {/* Meta Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Meta Tags</label>
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
