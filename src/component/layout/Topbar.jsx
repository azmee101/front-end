const Topbar = ({ user }) => {
  return (
    <header className="px-1 pt-4">
      <nav className="bg-red-600 text-orange-400 shadow-lg h-12 rounded-lg">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center">
            <img
              className="h-8 w-8 mr-2"
              src="Nagad_Vertical Logo_Latest 1.svg"
              alt="Nagad DFS Logo"
            />
            <span className="text-xl font-semibold">Nagad</span>
          </div>
          
          <div className="hidden md:block ml-auto mr-4">
            <span className="text-black">
              Logged in as: {user.username}
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Topbar;