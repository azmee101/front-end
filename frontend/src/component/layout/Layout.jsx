import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Layout = ({ user, children, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Save the current path whenever it changes
    if (location.pathname !== '/') {
      localStorage.setItem('lastPath', location.pathname);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar onLogout={onLogout} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Topbar user={user} />
        <div className="flex-1 p-4 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;