import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({ user, children, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col">
        <Topbar user={user} />
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;