import { useNavigate } from 'react-router-dom';

const AccessibleDocuments = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-8">
      <div className="bg-white rounded-lg shadow-md p-5 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 mb-2">
          🔓 Accessible Documents
        </h1>
        <p className="text-gray-600 mb-6">
          Documents you have permission to access. These include shared documents
          and publicly available resources.
        </p>

        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Public Policy Documents</h3>
                <span className="text-green-600 text-sm">Open Access</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">15 documents</p>
              <div className="mt-2 text-blue-600 text-sm">Last accessed: 2h ago</div>
            </div>

            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Shared Team Documents</h3>
                <span className="text-blue-600 text-sm">Team Access</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">8 documents</p>
              <div className="mt-2 text-blue-600 text-sm">Last shared: 1d ago</div>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button 
              onClick={() => navigate("/dashboard")}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Back to Dashboard
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
              Request Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibleDocuments;