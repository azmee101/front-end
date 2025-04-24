import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Clear localStorage and form data on component mount
    localStorage.removeItem('currentUser');
    setFormData({ email: '', password: '' });
    
    const loadUsers = async () => {
      try {
        const response = await fetch('/src/mocker/db/user.json');
        const data = await response.json();
        const userArray = Object.values(data.users);
        setUsers(userArray);
      } catch (err) {
        console.error('Error loading users:', err);
      }
    };
    loadUsers();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const user = users.find(
      u => u.user_name === formData.email && u.password === formData.password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify({
        email: user.user_name,
        username: user.full_Name,
        password: user.password
      }));
      setUser({
        email: user.user_name,
        username: user.full_Name
      });
      navigate('/welcome', { replace: true });
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center">
      <img 
        src="nagad.png" 
        alt="Background" 
        className="h-screen object-cover hidden md:block" 
      />
      
      <div className="w-full flex items-center justify-center">
        <form 
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-4"
        >
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Login</h1>
            <p className="text-gray-600">Complete your credentials to get started!</p>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="mb-4">
            <label 
              htmlFor="email" 
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email..."
              autoComplete="off"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              required
            />
          </div>

          <div className="mb-6">
            <label 
              htmlFor="password" 
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password..."
              autoComplete="off"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;