import { useState, useEffect } from 'react';
import { fetchWithAuth } from './utils/api';

const Dashboard = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalDocuments: 0,
    completedDocuments: 0,
    pendingDocuments: 0,
    recentActivities: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // You would need to implement these endpoints in your backend
        const [documentsResponse, activitiesResponse] = await Promise.all([
          fetchWithAuth('/Documents/summary'),
          fetchWithAuth('/Activities/recent')
        ]);

        const documentsData = await documentsResponse.json();
        const activitiesData = await activitiesResponse.json();

        setDashboardData({
          totalDocuments: documentsData.total || 0,
          completedDocuments: documentsData.completed || 0,
          pendingDocuments: documentsData.pending || 0,
          recentActivities: activitiesData || []
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Show fallback data
        setDashboardData({
          totalDocuments: 0,
          completedDocuments: 0,
          pendingDocuments: 0,
          recentActivities: []
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-2">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 mb-2">
          📊 Welcome, {user?.username || 'User'}
        </h1>
        <p className="text-gray-600 mb-6">
          Here's an overview of your document management activities and recent updates.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
          <div className="bg-blue-50 p-2 rounded-lg">
            <h3 className="text-blue-800 font-semibold mb-2">Total Documents</h3>
            <p className="text-2xl font-bold text-blue-600">{dashboardData.totalDocuments}</p>
          </div>
          <div className="bg-green-50 p-2 rounded-lg">
            <h3 className="text-green-800 font-semibold mb-2">Completed</h3>
            <p className="text-2xl font-bold text-green-600">{dashboardData.completedDocuments}</p>
          </div>
          <div className="bg-purple-50 p-2 rounded-lg">
            <h3 className="text-purple-800 font-semibold mb-2">Pending</h3>
            <p className="text-2xl font-bold text-purple-600">{dashboardData.pendingDocuments}</p>
          </div>
        </div>

        <div className="bg-gray-50 p-2 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activities
          </h2>
          <div className="space-y-3">
            {dashboardData.recentActivities.length > 0 ? (
              dashboardData.recentActivities.map((activity, index) => (
                <div key={index} className="bg-white p-3 rounded-md shadow-sm">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user || 'You'}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
              ))
            ) : (
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-sm text-gray-500">No recent activities</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;