import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ user, children, onLogout }) => {
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