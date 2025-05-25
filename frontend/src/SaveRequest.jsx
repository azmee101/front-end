import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SaveRequest = () => {
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
        <div className="bg-green-100 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg 
                className="h-8 w-8 text-green-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium text-green-800">
                File Request Created Successfully
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveRequest;
