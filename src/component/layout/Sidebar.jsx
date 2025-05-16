import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ onLogout }) => {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    let userRole = "user";

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        userRole = user.role || "user";
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    fetch('http://localhost:3001/menus')
      .then(response => response.json())
      .then(data => {
        const filteredMenus = data.filter(menu => menu.roles.includes(userRole));
        setMenus(filteredMenus);
      })
      .catch(error => console.error('Error fetching menus:', error));
  }, []);

  const handleLogout = () => onLogout?.();

  return (
    <div className="bg-white w-64 flex-shrink-0 shadow-lg overflow-y-auto rounded-lg m-3">
      <div className="p-2">
        <nav className="mt-1">
          {menus.map((menu) => (
            <button
              key={menu.id}
              className={`w-full flex items-center p-2 text-gray-600 rounded-lg transition-colors ${
                location.pathname === menu.path 
                  ? 'bg-red-300' 
                  : 'hover:bg-red-300'
              }`}
              onClick={() => navigate(menu.path)}
            >
              <svg
                className="w-4 h-4 mr-2"
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

          <button
            onClick={handleLogout}
            className="w-full flex items-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-8"
          >
            <svg
              className="w-4 h-4 mr-2"
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