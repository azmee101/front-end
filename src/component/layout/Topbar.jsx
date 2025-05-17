const Topbar = ({ user }) => {
  return (
    <header className="px-1 pt-4">
      <nav className="bg-red-600 text-white-400 shadow-lg h-12 rounded-lg">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center">
            <img
              className="h-8 w-8 mr-2"
              src="Nagad_Vertical Logo_Latest 1.svg"
              alt="Nagad DFS Logo"
            />
            <span className="text-xl font-semibold text-white">Nagad</span>
          </div>
          
          <button 
  type="button" 
  className="hidden md:block ml-auto mr-4 bg-white rounded-md px-2 py-2 text-orange-500 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
>
  {user.username}
</button>
        </div>
      </nav>
    </header>
  );
};

export default Topbar;