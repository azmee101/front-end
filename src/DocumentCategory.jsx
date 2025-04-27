import { useNavigate } from 'react-router-dom';

const DocumentCategory = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-8">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          📂 Document Categories
        </h1>
        <p className="text-gray-600 mb-6">
          Manage and browse documents by category. Create new categories or modify existing ones.
        </p>

        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-semibold mb-2 flex items-center">
                <span className="text-blue-600 mr-2">•</span>
                Financial Documents
              </h3>
              <p className="text-sm text-gray-500">24 sub-categories</p>
              <div className="mt-2 text-sm text-blue-600">Last updated: 3d ago</div>
            </div>

            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-semibold mb-2 flex items-center">
                <span className="text-green-600 mr-2">•</span>
                Legal Contracts
              </h3>
              <p className="text-sm text-gray-500">18 sub-categories</p>
              <div className="mt-2 text-sm text-blue-600">Last updated: 1w ago</div>
            </div>

            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-semibold mb-2 flex items-center">
                <span className="text-purple-600 mr-2">•</span>
                Technical Specs
              </h3>
              <p className="text-sm text-gray-500">32 sub-categories</p>
              <div className="mt-2 text-sm text-blue-600">Last updated: 2d ago</div>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button 
              onClick={() => navigate(-1)}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Back to Dashboard
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Create New Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCategory;