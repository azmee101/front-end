import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useLocation, useNavigate } from 'react-router-dom';

const AssignDocument = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { rowData, returnPath } = location.state || {};
  
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [previewFile, setPreviewFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles?.length) {
      setError('Please upload valid documents only');
    } else {
      setError('');
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: '*/*',
    multiple: true
  });

  const handlePreview = (file) => {
    setPreviewFile(file);
    setShowPreview(true);
  };

  const closePreview = (e) => {
    if (e) e.stopPropagation();
    setShowPreview(false);
    setPreviewFile(null);
  };

  const renderPreview = () => {
    if (!previewFile) return null;
    const fileType = previewFile.type.split('/')[0];
    const fileUrl = URL.createObjectURL(previewFile);

    switch (fileType) {
      case 'image':
        return <img src={fileUrl} alt={previewFile.name} className="max-h-full max-w-full object-contain p-4" />;
      case 'video':
        return (
          <video controls className="max-h-full max-w-full p-4">
            <source src={fileUrl} type={previewFile.type} />
            Your browser does not support the video tag.
          </video>
        );
      case 'audio':
        return (
          <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg m-4">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-16 h-16 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
              </svg>
            </div>
            <audio controls className="w-full">
              <source src={fileUrl} type={previewFile.type} />
              Your browser does not support the audio tag.
            </audio>
          </div>
        );
      case 'application':
        if (previewFile.type === 'application/pdf') {
          return (
            <iframe
              src={fileUrl}
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

  const fileList = files.map(file => (
    <li key={file.name} className="py-2 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <div 
          className="flex-1 cursor-pointer hover:text-blue-500"
          onClick={() => handlePreview(file)}
        >
          <span className="font-medium">{file.name}</span>
          <span className="text-gray-500 ml-2">({(file.size / 1024).toFixed(2)} KB)</span>
        </div>
        <button
          onClick={() => setFiles(files.filter(f => f !== file))}
          className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer ml-2"
        >
          Remove
        </button>
      </div>
    </li>
  ));

  const removeAll = () => {
    setFiles([]);
    setError('');
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));

      // Here you would typically upload the files and associate them with the request
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        navigate(returnPath || '/');
      } else {
        setError('Failed to assign documents. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setError('An error occurred while assigning documents.');
    }
  };

  const handleCancel = () => {
    navigate(returnPath || '/');
  };

  return (
    <div className="max-w-3xl mx-auto p-5">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Assign Documents</h2>
        {rowData && (
          <p className="mt-2 text-gray-600">
            Assigning documents to request: {rowData.name || rowData.id}
          </p>
        )}
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-300
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${isDragReject ? 'border-red-500 bg-red-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {isDragActive ? (
            <p className="text-blue-500 font-medium">Drop the files here...</p>
          ) : (
            <div>
              <p className="text-gray-600 font-medium">Drag and drop files here</p>
              <p className="text-gray-500 text-sm mt-1">or click to browse</p>
            </div>
          )}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium text-gray-900">Selected Files</h3>
            <button
              onClick={removeAll}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Remove All
            </button>
          </div>
          <ul className="space-y-2">{fileList}</ul>
        </div>
      )}

      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={handleCancel}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={files.length === 0}
          className={`px-4 py-2 text-white rounded-md ${
            files.length === 0
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Assign Documents
        </button>
      </div>

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
              <h3 className="text-xl font-bold truncate flex-1 pr-4">{previewFile?.name}</h3>
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
    </div>
  );
};

export default AssignDocument;
