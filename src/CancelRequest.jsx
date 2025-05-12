import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CancelRequest = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect after 2 seconds
    const timer = setTimeout(() => {
      navigate('/file-request');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full mx-4">
        <div className="bg-red-100 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg 
                className="h-8 w-8 text-red-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium text-red-800">
                File Request Cancelled
              </p>
              <p className="mt-1 text-sm text-red-600">
                The file request has been cancelled successfully.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelRequest;
