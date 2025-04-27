import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Login from "./Login";
import Welcome from "./welcome";
import AssignedDocuments from "./AssignedDocuments";
import Dashboard from "./Dashboard";
import Profile from "./Profile.jsx";
import AllDocuments from './AllDocuments';
import AccessibleDocuments from './AccessibleDocuments';
import DocumentCategory from './DocumentCategory';
import ArchiveDocuments from './ArchiveDocuments';
import Settings from './Settings';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid user data:", error);
        localStorage.removeItem("currentUser");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/welcome" /> : <Login setUser={setUser} />
          }
        />

        <Route
          path="/welcome"
          element={
            user ? (
              <Welcome user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/" />}
        />

        
        <Route 
          path="/profile" 
          element={user ? <Profile user={user} /> : <Navigate to="/" />}
        />

        <Route 
          path="/all-documents" 
          element={
            user ? <AllDocuments /> : <Navigate to="/" />
          }
        />

        <Route
          path="/assigned-documents"
          element={user ? <AssignedDocuments /> : <Navigate to="/" />}
        />

        <Route 
          path="/accessible-documents" 
          element={
            user ? <AccessibleDocuments /> : <Navigate to="/" />
          }
        />

        <Route 
          path="/document-categories" 
          element={
            user ? <DocumentCategory /> : <Navigate to="/" />
          }
        />

        <Route 
          path="/archive-documents" 
          element={
            user ? <ArchiveDocuments /> : <Navigate to="/" />
          }
        />

        <Route 
          path="/settings" 
          element={
            user ? <Settings user={user} /> : <Navigate to="/" />
          }
        />

      </Routes>
    </Router>
  );
}

export default App;