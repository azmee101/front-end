import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Welcome from './Welcome';

function App() {
  const [user, setUser] = useState(null);

  // Sync with localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Invalid user data:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  // Central logout handler
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null); // Force immediate state update
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          user ? <Navigate to="/welcome" /> : <Login setUser={setUser} />
        } />
        <Route path="/welcome" element={
          user ? <Welcome user={user} onLogout={handleLogout} /> : <Navigate to="/" />
        } />
      </Routes>
    </Router>
  );
}

export default App;