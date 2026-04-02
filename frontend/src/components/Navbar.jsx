import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg transition font-medium ${
      location.pathname === path
        ? 'bg-white text-blue-700'
        : 'text-white hover:bg-blue-500'
    }`;

  return (
    <nav className="bg-blue-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to={user ? '/dashboard' : '/login'}
          className="text-2xl font-bold tracking-tight hover:text-blue-100 transition"
        >
          📚 Online Comic Library
        </Link>

        <div className="flex items-center gap-3 flex-wrap justify-end">
          {user ? (
            <>
              <Link to="/dashboard" className={linkClass('/dashboard')}>
                Dashboard
              </Link>

              <Link to="/browse" className={linkClass('/browse')}>
                Browse
              </Link>

              {user.role === 'Admin' && (
                <Link to="/comics" className={linkClass('/comics')}>
                  Manage Comics
                </Link>
              )}

              <Link to="/profile" className={linkClass('/profile')}>
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkClass('/login')}>
                Login
              </Link>

              <Link
                to="/register"
                className="bg-green-500 px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;