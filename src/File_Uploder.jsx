import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const DocumentUploader = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

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

  const fileList = files.map(file => (
    <li key={file.name} className="py-2 border-b border-gray-200">
      <span className="font-medium">{file.name}</span>
      <span className="text-gray-500 ml-2">({(file.size / 1024).toFixed(2)} KB)</span>
    </li>
  ));

  const removeAll = () => {
    setFiles([]);
    setError('');
  };

  return (
    <div className="max-w-3xl mx-auto p-5">
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
            <h3 className="text-lg font-medium text-gray-900">Uploaded Files</h3>
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
    </div>
  );
};

export default DocumentUploader;