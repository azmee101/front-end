import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ user, children, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar placed as a direct child of the outer flex container */}
      <Sidebar onLogout={onLogout} />
      
      {/* Main content area */}
      <main className="flex-1 flex flex-col">
        {/* Topbar at the top */}
        <Topbar user={user} />
        
        {/* Centered content container */}
        <div className="flex-1 flex items-center justify-center p-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;