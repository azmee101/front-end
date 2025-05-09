import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from './component/layout/Layout';

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

  const AuthenticatedRoute = ({ children }) => {
    return user ? (
      <Layout user={user} onLogout={handleLogout}>
        {children}
      </Layout>
    ) : (
      <Navigate to="/" />
    );
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/welcome" /> : <Login setUser={setUser} />}
        />

        <Route
          path="/welcome"
          element={
            <AuthenticatedRoute>
              <Welcome user={user} />
            </AuthenticatedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <AuthenticatedRoute>
              <Dashboard user={user} />
            </AuthenticatedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <AuthenticatedRoute>
              <Profile user={user} />
            </AuthenticatedRoute>
          }
        />

        <Route
          path="/all-documents"
          element={
            <AuthenticatedRoute>
              <AllDocuments />
            </AuthenticatedRoute>
          }
        />

        <Route
          path="/assigned-documents"
          element={
            <AuthenticatedRoute>
              <AssignedDocuments />
            </AuthenticatedRoute>
          }
        />

        <Route
          path="/accessible-documents"
          element={
            <AuthenticatedRoute>
              <AccessibleDocuments />
            </AuthenticatedRoute>
          }
        />

        <Route
          path="/document-categories"
          element={
            <AuthenticatedRoute>
              <DocumentCategory />
            </AuthenticatedRoute>
          }
        />

        <Route
          path="/archive-documents"
          element={
            <AuthenticatedRoute>
              <ArchiveDocuments />
            </AuthenticatedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <AuthenticatedRoute>
              <Settings user={user} />
            </AuthenticatedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;