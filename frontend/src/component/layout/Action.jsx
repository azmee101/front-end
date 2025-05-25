// components/VerticalDotMenu.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaEye, 
  FaEdit, 
  FaShare, 
  FaLink, 
  FaUpload, 
  FaHistory, 
  FaComment,
  FaBell,
  FaEnvelope,
  FaArchive,
  FaTrash
} from 'react-icons/fa';

const Action = ({ variant = 'default', rowData, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const message = window.location.pathname === '/pending-file-request' 
      ? "Are you sure you want to cancel this file request?" 
      : "Are you sure you want to delete this file request?";
    
    if (window.confirm(message)) {
      try {
        setIsOpen(false);
        if (onDelete) {
          await onDelete(rowData.id);
        }
      } catch (error) {
        console.error('Error in delete:', error);
      }
    }
  };

  const handleMenuItemClick = async (action) => {
    switch (action) {
      case "View":
        navigate("/add-file-request", { 
          state: { 
            rowData,
            mode: 'view',
            returnPath: window.location.pathname
          } 
        });
        break;
      case "Assign Document":
        navigate("/add-document", { 
          state: { 
            rowData,
            mode: 'add',
            returnPath: window.location.pathname
          } 
        });
        break;
      case "Edit":
        navigate("/add-file-request", { 
          state: { 
            rowData,
            mode: 'edit',
            returnPath: window.location.pathname
          } 
        });
        break;
      case "Cancel":
      case "Delete":
        await handleDelete();
        break;
      default:
        break;
    }
  };

  const MenuItem = ({ icon, text, danger = false }) => (
    <button 
      className={`flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors ${
        danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-800'
      }`}
      onClick={() => handleMenuItemClick(text)}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </button>
  );

  const renderMenuItems = () => {

    switch (variant) {
      case 'AllDocuments' :
      case 'AssignedDocuments':
        return (
          <>
            <MenuItem icon={<FaEye className="text-gray-600" />} text="View" />
            <MenuItem icon={<FaEdit className="text-blue-600" />} text="Edit" />
            <MenuItem icon={<FaShare className="text-green-600" />} text="Share" />
            <MenuItem icon={<FaLink className="text-purple-600" />} text="Get Shareable Link" />
            
            <div className="border-t border-gray-200 my-2" />
            
            <MenuItem icon={<FaUpload className="text-orange-600" />} text="Upload New Version" />
            <MenuItem icon={<FaHistory className="text-amber-600" />} text="Version History" />
            
            <div className="border-t border-gray-200 my-2" />
            
            <MenuItem icon={<FaComment className="text-sky-600" />} text="Comment" />
            <MenuItem icon={<FaBell className="text-pink-600" />} text="Add Reminder" />
            <MenuItem icon={<FaEnvelope className="text-rose-600" />} text="Send Email" />
            
            <div className="border-t border-gray-200 my-2" />
            
            <MenuItem icon={<FaArchive className="text-indigo-600" />} text="Archive" />
            
            <div className="border-t border-gray-200 my-2" />
            
            <MenuItem 
              icon={<FaTrash className="text-red-600" />} 
              text="Delete" 
              danger
            />
          </>
        );
      case 'PendingFileRequest':
        return (
          <>
            <MenuItem icon={<FaEye className="text-gray-600" />} text="View" />
            <MenuItem icon={<FaEdit className="text-blue-600" />} text="Assign Document" />
            <div className="border-t border-gray-200 my-2" />
            <MenuItem 
              icon={<FaTrash className="text-red-600" />} 
              text="Cancel" 
              danger
            />
          </>
        );
      case 'FileRequest':
        return (
          <>
            <MenuItem icon={<FaEye className="text-gray-600" />} text="View" />
            <MenuItem icon={<FaEdit className="text-blue-600" />} text="Edit" />
            <div className="border-t border-gray-200 my-2" />
            <MenuItem 
              icon={<FaTrash className="text-red-600" />} 
              text="Delete" 
              danger
            />
          </>
        );
      default:
        return (
          <>
            <MenuItem icon={<FaEye className="text-gray-600" />} text="View" />
            <MenuItem icon={<FaEdit className="text-blue-600" />} text="Edit" />
            <div className="border-t border-gray-200 my-2" />
            <MenuItem 
              icon={<FaTrash className="text-red-600" />} 
              text="Delete" 
              danger
            />
          </>
        );
    }
  };

  return (
    <div className="relative inline-block">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Open menu"
      >
        <div className="flex flex-col gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-gray-600 rounded-full" />
          ))}
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 z-[999] backdrop-blur-sm"
        />
      )}

      {/* Menu Popup */}
      {isOpen && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-xl shadow-xl z-[1000] min-w-[280px] py-3">
          <div className="flex flex-col space-y-2">
            {renderMenuItems()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Action;