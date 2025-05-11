import { useState, useRef } from 'react';

const Upload = () => {
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleFileSelect = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleRemoveFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            files.forEach((file) => formData.append('files', file));

            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setMessage('Files uploaded successfully!');
                setFiles([]); // Clear the file list after successful upload
            } else {
                setMessage('Failed to upload files.');
            }
        } catch (error) {
            error;
            setMessage('An error occurred while uploading the files.');
        }
    };

    return (
        
        <div 
            onDrop={handleDrop} 
            onDragOver={handleDragOver} 
            onClick={handleClick}
            className="border-2 border-dashed border-gray-300 rounded-lg p-5 text-center text-gray-600 bg-gray-100 cursor-pointer"
        >
            <p>Drag and drop files here, or click to select files.</p>
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileSelect} 
                multiple
            />
            {files.length > 0 && (
                <div className="mt-5 text-left">
                    <h4>Selected Files:</h4>
                    <div className="flex flex-col gap-2 mt-2">
                        {files.map((file, index) => (
                            <div 
                                key={index} 
                                className="flex justify-between items-center p-2 border border-gray-300 rounded bg-gray-100"
                            >
                                <div>
                                    <p className="m-0 font-bold">{file.name}</p>
                                    <p className="m-0 text-sm text-gray-600">{(file.size / 1024).toFixed(2)} KB</p>
                                </div>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent event propagation
                                        handleRemoveFile(index);
                                    }} 
                                    className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent event propagation
                            handleUpload();
                        }} 
                        className="mt-5 px-5 py-2 bg-blue-500 text-white rounded cursor-pointer"
                    >
                        Upload Files
                    </button>
                </div>
            )}
            {message && <p onClick={(e) => e.stopPropagation()} className={`mt-5 ${message.includes('error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
        </div>
    );
};

export default Upload;