import { useNavigate } from 'react-router-dom';

const ArchiveDocuments = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-8">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          🗃 Archived Documents
        </h1>
        <p className="text-gray-600 mb-6">
          View and manage documents moved to archive. Archived documents are retained for record-keeping purposes.
        </p>

        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="mb-6 flex items-center gap-4">
            <input
              type="text"
              placeholder="Search archives..."
              className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="px-4 py-2 rounded-md border border-gray-300">
              <option>Filter by Year</option>
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">2023 Financial Reports</h3>
                  <p className="text-sm text-gray-500">Archived on: 2024-01-15</p>
                </div>
                <span className="text-red-600 text-sm bg-red-50 px-2 py-1 rounded">Expired</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Old User Manuals</h3>
                  <p className="text-sm text-gray-500">Archived on: 2023-11-30</p>
                </div>
                <span className="text-green-600 text-sm bg-green-50 px-2 py-1 rounded">Permanent</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">2022 Meeting Minutes</h3>
                  <p className="text-sm text-gray-500">Archived on: 2023-01-10</p>
                </div>
                <span className="text-blue-600 text-sm bg-blue-50 px-2 py-1 rounded">Regulatory</span>
              </div>
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
              Restore Documents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveDocuments;