import { useNavigate } from 'react-router-dom';

const Profile = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex-1">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 mb-2">
          👤 User Profile
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-2"></div>
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-white p-4 rounded-md">
                  <span className="text-gray-600">Full Name:</span>
                  <span className="font-medium">{user.username}</span>
                </div>
                <div className="flex justify-between items-center bg-white p-4 rounded-md">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between items-center bg-white p-4 rounded-md">
                  <span className="text-gray-600">Account Created:</span>
                  <span className="font-medium">March 15, 2024</span>
                </div>
              </div>
              
              <div className="mt-6 flex gap-2">
                <button 
                  onClick={() => navigate(-1)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Back
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;