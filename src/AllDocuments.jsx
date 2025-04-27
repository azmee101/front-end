import { useNavigate } from 'react-router-dom';

const AllDocuments = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-8">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          📁 All Documents Repository
        </h1>
        <p className="text-gray-600 mb-6">
          Browse through all available documents in the system. Use filters or search to
          find specific documents.
        </p>

        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Search documents..."
              className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Advanced Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-semibold mb-2">Financial Reports</h3>
              <p className="text-sm text-gray-500">23 documents</p>
              <div className="mt-2 text-blue-600 text-sm">Last updated: 2h ago</div>
            </div>
            
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-semibold mb-2">User Manuals</h3>
              <p className="text-sm text-gray-500">15 documents</p>
              <div className="mt-2 text-blue-600 text-sm">Last updated: 1d ago</div>
            </div>

            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-semibold mb-2">Technical Specifications</h3>
              <p className="text-sm text-gray-500">42 documents</p>
              <div className="mt-2 text-blue-600 text-sm">Last updated: 3h ago</div>
            </div>

            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-semibold mb-2">Legal Contracts</h3>
              <p className="text-sm text-gray-500">38 documents</p>
              <div className="mt-2 text-blue-600 text-sm">Last updated: 5d ago</div>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button 
              onClick={() => navigate(-1)}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Back to Dashboard
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
              Upload New Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllDocuments;