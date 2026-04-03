import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Comics from './pages/Comics';
import Dashboard from './pages/Dashboard';
import BrowseComics from './pages/BrowseComics';
import ComicDetails from './pages/ComicDetails';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} />} />

        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
        />

        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/browse"
          element={user ? <BrowseComics /> : <Navigate to="/login" />}
        />

        <Route
          path="/comics"
          element={user ? <Comics /> : <Navigate to="/login" />}
        />

        <Route
          path="/comics/:id"
          element={user ? <ComicDetails /> : <Navigate to="/login" />}
        />

        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;