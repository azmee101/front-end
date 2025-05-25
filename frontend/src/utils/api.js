// API configuration
export const API_BASE_URL = 'https://localhost:7196/api';

// Centralized API error handling
const handleApiError = (error) => {
  console.error('API Error:', error);
  if (error.status === 401) {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
    throw new Error('Session expired. Please login again.');
  }
  if (!error.ok) {
    throw new Error(error.statusText || 'An error occurred');
  }
  throw error;
};

// Utility function to handle API calls with authentication
export const fetchWithAuth = async (endpoint, options = {}) => {
  try {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(user?.token && { Authorization: `Bearer ${user.token}` })
    };

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      await handleApiError(response);
    }
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};
