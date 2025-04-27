import { useNavigate } from 'react-router-dom';

const AssignedDocuments = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-8">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          🗂 Welcome to the Assigned Documents Section
        </h1>
        <p className="text-gray-600 mb-6">
          Here you can view and manage all documents assigned to you. Use the filters
          below to sort through your documents or click the button to assign new documents.
        </p>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Dashboard
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
              Assign New Document
            </button>
          </div>
          
          <div className="mt-6 space-y-3">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-semibold">Document 1: Quarterly Report</h3>
              <p className="text-sm text-gray-500">Assigned on: 2024-03-01</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-semibold">Document 2: User Manual</h3>
              <p className="text-sm text-gray-500">Assigned on: 2024-03-05</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedDocuments;