import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "./utility/userUtils";

const AddFileRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.rowData;
  const mode = location.state?.mode || 'add'; // Can be 'add', 'view', or 'edit'
  const returnPath = location.state?.returnPath || '/file-request';

  const [formData, setFormData] = useState({
    subject: "",
    email: "",
    fileExtension: "",
    maxDocuments: 1,
    maxFileSize: "Less than 5 MB",
    password: "",
    expiryDate: ""
  });

  const [errors, setErrors] = useState({
    subject: "",
    fileExtension: "",
    password: "",
    expiryDate: ""
  });

  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [isLinkValid, setIsLinkValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCancellation, setShowCancellation] = useState(false);

  useEffect(() => {
    // Disable all form inputs in view mode
    const formInputs = document.querySelectorAll('input, select, button');
    if (mode === 'view') {
      formInputs.forEach(input => {
        if (input.type !== 'submit' && input.type !== 'button') {
          input.disabled = true;
        }
      });
    }

    if (rowData) {
      // Convert array of extensions to matching select option
      let fileExtOption = "";
      if (rowData.allowedExtensions.includes(".pdf")) {
        fileExtOption = "pdf";
      } else if (rowData.allowedExtensions.includes(".doc")) {
        fileExtOption = "doc";
      } else if (rowData.allowedExtensions.includes(".jpg")) {
        fileExtOption = "image";
      }

      setFormData({
        subject: rowData.subject || "",
        email: rowData.email || "",
        fileExtension: fileExtOption,
        maxDocuments: parseInt(rowData.maxDocuments) || 1,
        maxFileSize: rowData.maxFileSize || "Less than 5 MB",
        password: "",
        expiryDate: rowData.linkExpiration ? new Date(rowData.linkExpiration).toISOString().split('T')[0] : ""
      });

      // Set the checkbox states based on data
      setIsPasswordRequired(false); // Reset password requirement
      setIsLinkValid(!!rowData.linkExpiration);
    }
  }, [rowData, mode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};

    // Validate subject
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is Required.";
    }

    // Validate file extension
    if (!formData.fileExtension) {
      newErrors.fileExtension = "Allow File Extension is Required";
    }

    // Validate password if required
    if (isPasswordRequired && !formData.password) {
      newErrors.password = "Password is required";
    }

    // Validate expiry date if link valid is checked
    if (isLinkValid && !formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const currentUser = getCurrentUser();
        let documentEndpoint = 'http://localhost:3001/documents';
        let method = 'POST';

        // If in edit mode, update existing document
        if (mode === 'edit' && rowData) {
          documentEndpoint = `${documentEndpoint}/${rowData.id}`;
          method = 'PUT';
        }

        // Create document object
        const documentData = {
          ...(rowData && { id: rowData.id }), // Keep existing ID if editing
          refno: rowData ? rowData.refno : `DMS-${String(Date.now()).slice(-3)}`,
          subject: formData.subject,
          email: formData.email,
          maxFileSize: formData.maxFileSize,
          maxDocuments: formData.maxDocuments,
          allowedExtensions: getAllowedExtensions(formData.fileExtension),
          status: rowData ? rowData.status : "Created",
          name: rowData ? rowData.name : `Document_${Date.now()}.${getDefaultExtension(formData.fileExtension)}`,
          category: formData.fileExtension,
          storage: "Cloud Storage",
          client: "Client A",
          createdDate: rowData ? rowData.createdDate : new Date().toLocaleDateString(),
          linkExpiration: isLinkValid ? formData.expiryDate : "",
          createdBy: currentUser.name,
          createdById: currentUser.user_id,
        };

        // Send request
        const response = await fetch(documentEndpoint, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(documentData)
        });

        if (!response.ok) {
          throw new Error(mode === 'edit' ? 'Failed to update document' : 'Failed to add document');
        }

        // Show success message
        setShowSuccess(true);
        
        // Hide success message after 2 seconds and redirect back
        setTimeout(() => {
          setShowSuccess(false);
          navigate(returnPath); // Use the returnPath from location state
        }, 2000);
      } catch (error) {
        console.error('Error:', error);
        alert(`Failed to ${mode === 'edit' ? 'update' : 'add'} document. Please try again.`);
      }
    }
  };

  const getAllowedExtensions = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return ['.pdf'];
      case 'doc':
        return ['.doc', '.docx'];
      case 'image':
        return ['.jpg', '.png'];
      default:
        return [];
    }
  };

  const getDefaultExtension = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return 'pdf';
      case 'doc':
        return 'docx';
      case 'image':
        return 'jpg';
      default:
        return '';
    }
  };

  const handleCancel = () => {
    setShowCancellation(true);
    setTimeout(() => {
      setShowCancellation(false);
      navigate(returnPath);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-4 right-4 flex items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <span>{mode === 'edit' ? 'Request updated successfully!' : 'Request submitted successfully!'}</span>
        </div>
      )}

      {/* Cancellation Toast */}
      {showCancellation && (
        <div className="fixed top-4 right-4 flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <span>Request cancelled. Redirecting...</span>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-6">
        {mode === 'view' ? 'View File Request' : mode === 'edit' ? 'Edit File Request' : 'Add File Request'}
      </h2>

      <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
        <div className="space-y-6">
          {/* Subject */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.subject && (
              <span className="text-red-500 text-sm">{errors.subject}</span>
            )}
          </div>

          {/* Four Fields Row */}
          <div className="grid grid-cols-4 gap-4">
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Allow File Extension */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Allow File Extension</label>
              <select 
                name="fileExtension"
                value={formData.fileExtension}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select File Extension</option>
                <option value="pdf">.pdf</option>
                <option value="doc">.doc, .docx</option>
                <option value="image">.jpg, .png</option>
              </select>
              {errors.fileExtension && (
                <span className="text-red-500 text-sm">{errors.fileExtension}</span>
              )}
            </div>

            {/* Maximum Document Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Maximum Document Upload</label>
              <input
                type="number"
                name="maxDocuments"
                value={formData.maxDocuments}
                onChange={handleInputChange}
                min="1"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Maximum File Size Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Maximum File Size Upload</label>
              <select
                name="maxFileSize"
                value={formData.maxFileSize}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option>Less than 1 MB</option>
                <option>Less than 2 MB</option>
                <option>Less than 5 MB</option>
                <option>Less than 10 MB</option>
                <option>Less than 25 MB</option>
                <option>Less than 50 MB</option>
              </select>
            </div>
          </div>

          {/* Password Protection and Link Expiration */}
          <div className="flex gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password Protection</label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="passwordRequired"
                  checked={isPasswordRequired}
                  onChange={(e) => setIsPasswordRequired(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="passwordRequired" className="text-sm text-gray-600">
                  Is password Required
                </label>
              </div>
              {isPasswordRequired && (
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm pr-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {showPassword ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c-4.478 0-8.268 2.943-9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      )}
                    </svg>
                  </button>
                  {errors.password && (
                    <span className="text-red-500 text-sm block mt-1">{errors.password}</span>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Link expiration</label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="linkValid"
                    checked={isLinkValid}
                    onChange={(e) => setIsLinkValid(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="linkValid" className="text-sm text-gray-600">
                    Is Link Valid until
                  </label>
                </div>
                {isLinkValid && (
                  <div className="mt-2">
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.expiryDate && (
                      <span className="text-red-500 text-sm block mt-1">{errors.expiryDate}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            {mode !== 'view' && (
              <button 
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                {mode === 'edit' ? 'Update' : 'Save'}
              </button>
            )}
            <button 
              onClick={handleCancel}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {mode === 'view' ? 'Back' : 'Cancel'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFileRequest;