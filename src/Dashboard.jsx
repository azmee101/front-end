const Dashboard = () => {
        return (
          <div className="flex-1 p-2">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
              <h1 className="text-2xl font-bold text-blue-600 mb-2">
                📊 Welcome to Your Dashboard
              </h1>
              <p className="text-gray-600 mb-6">
                Here's an overview of your document management activities and recent updates.
              </p>
      
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <h3 className="text-blue-800 font-semibold mb-2">Total Documents</h3>
                  <p className="text-2xl font-bold text-blue-600">142</p>
                </div>
                <div className="bg-green-50 p-2 rounded-lg">
                  <h3 className="text-green-800 font-semibold mb-2">Completed</h3>
                  <p className="text-2xl font-bold text-green-600">89</p>
                </div>
                <div className="bg-purple-50 p-2 rounded-lg">
                  <h3 className="text-purple-800 font-semibold mb-2">Pending</h3>
                  <p className="text-2xl font-bold text-purple-600">53</p>
                </div>
              </div>
      
              <div className="bg-gray-50 p-2 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Recent Activities
                </h2>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-md shadow-sm">
                    <p className="text-sm">
                      <span className="font-medium">You</span> reviewed "Q4 Financial Report"
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm">
                    <p className="text-sm">
                      <span className="font-medium">Admin</span> assigned "User Manual v2.0"
                    </p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      };
      
      export default Dashboard;