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
            setMessage('An error occurred while uploading the files.');
        }
    };

    return (
        <div 
            onDrop={handleDrop} 
            onDragOver={handleDragOver} 
            onClick={handleClick}
            style={{
                border: '2px dashed #ccc',
                borderRadius: '10px',
                padding: '20px',
                textAlign: 'center',
                color: '#666',
                backgroundColor: '#f9f9f9',
                cursor: 'pointer',
            }}
        >
            <p>Drag and drop files here, or click to select files.</p>
            <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleFileSelect} 
                multiple
            />
            {files.length > 0 && (
                <div style={{ marginTop: '20px', textAlign: 'left' }}>
                    <h4>Selected Files:</h4>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        marginTop: '10px',
                    }}>
                        {files.map((file, index) => (
                            <div 
                                key={index} 
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    backgroundColor: '#f9f9f9',
                                }}
                            >
                                <div>
                                    <p style={{ margin: 0, fontWeight: 'bold' }}>{file.name}</p>
                                    <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{(file.size / 1024).toFixed(2)} KB</p>
                                </div>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent event propagation
                                        handleRemoveFile(index);
                                    }} 
                                    style={{
                                        padding: '5px 10px',
                                        backgroundColor: '#FF4D4D',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <button 
                        onClick={handleUpload} 
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Upload Files
                    </button>
                </div>
            )}
            {message && <p style={{ marginTop: '20px', color: 'green' }}>{message}</p>}
        </div>
    );
};

export default Upload;