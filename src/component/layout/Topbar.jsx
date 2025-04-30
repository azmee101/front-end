// src/components/layout/Topbar.jsx
const Topbar = ({ user }) => {
    return (
      <nav className="bg-blue-600 text-white shadow-lg h-16 rounded-lg mx-4 mt-4">
        <div className="flex items-center justify-between h-full">
          <div className="flex flex-1">
            <div className="flex-shrink-0 flex items-center ml-4">
              <img
                className="h-8 w-8 mr-2"
                src="Nagad_Vertical Logo_Latest 1.svg"
                alt="Nagad DFS Logo"
              />
              <span className="text-xl font-semibold">Nagad DFS</span>
            </div>
            <div className="hidden md:flex items-center ml-[870px]">
              <span className="text-gray-200">
                Logged in as: {user.username}
              </span>
            </div>
          </div>
        </div>
      </nav>
    );
  };
  
export default Topbar;