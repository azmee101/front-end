import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onLogout }) => {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current user from localStorage
    const storedUser = localStorage.getItem("currentUser");
    let userRole = "user"; // default role

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        userRole = user.role || "user";
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    // Fetch menus from db.json
    fetch('http://localhost:3001/menus')
      .then(response => response.json())
      .then(data => {
        // Filter menus based on user role
        const filteredMenus = data.filter(menu => menu.roles.includes(userRole));
        setMenus(filteredMenus);
      })
      .catch(error => console.error('Error fetching menus:', error));
  }, []); // Run only once on component mount

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="bg-white w-64 shadow-lg overflow-y-auto rounded-lg m-4">
      <div className="p-4">
        <nav className="mt-4">
          {/* Dynamic Menu Items */}
          {menus.map((menu) => (
            <button
              key={menu.id}
              className="w-full flex items-center p-3 text-gray-600 hover:bg-blue-50 rounded-lg transition-colors"
              onClick={() => navigate(menu.path)}
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={menu.icon}
                />
              </svg>
              {menu.title}
            </button>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-8"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;