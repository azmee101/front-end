import { useState, useRef } from 'react';

const Upload = () => {
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState('');
    const [previewFile, setPreviewFile] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
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
        if (!previewFile) return null;        const fileType = previewFile.type.split('/')[0];
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

    return (
        <>
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
                                    <div 
                                        className="flex-1 cursor-pointer hover:text-blue-500"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePreview(file);
                                        }}
                                    >
                                        <p className="m-0 font-bold">{file.name}</p>
                                        <p className="m-0 text-sm text-gray-600">{(file.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveFile(index);
                                        }} 
                                        className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer ml-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleUpload();
                            }} 
                            className="mt-5 px-5 py-2 bg-blue-500 text-white rounded cursor-pointer"
                        >
                            Upload Files
                        </button>
                    </div>
                )}
                {message && <p onClick={(e) => e.stopPropagation()} className={`mt-5 ${message.includes('error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
            </div>            {/* Preview Modal */}
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
        </>
    );
};

export default Upload;