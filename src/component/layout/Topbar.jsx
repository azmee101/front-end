const Topbar = ({ user }) => {
  return (
    <header className="px-4 pt-4">
      <nav className="bg-blue-600 text-white shadow-lg h-16 rounded-lg">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center">
            <img
              className="h-8 w-8 mr-2"
              src="Nagad_Vertical Logo_Latest 1.svg"
              alt="Nagad DFS Logo"
            />
            <span className="text-xl font-semibold">Nagad DFS</span>
          </div>
          
          <div className="hidden md:block ml-auto mr-4">
            <span className="text-gray-200">
              Logged in as: {user.username}
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Topbar;