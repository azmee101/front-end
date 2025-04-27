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
        path="/assigned-documents" 
        element={
        user ? <AssignedDocuments /> : <Navigate to="/" />
        } 
        />
      </Routes>
    </Router>
  );
}

export default App;
