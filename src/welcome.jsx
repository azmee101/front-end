import { useNavigate } from "react-router-dom";

const Welcome = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome back, {user.username}!
        </h1>
        <p className="text-gray-600 mb-6">
          You're now accessing the Nagad DFS Dashboard. Here you can manage
          your digital financial services, view transactions, and update
          your settings.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">
            Quick Actions
          </h2>
          <div className="flex space-x-4">
            <button 
              onClick={() => navigate('/new-transaction')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              New Transaction
            </button>
            <button 
              onClick={() => navigate('/transaction-history')}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              View History
            </button>
            <button 
              onClick={() => navigate('/settings')}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Account Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;