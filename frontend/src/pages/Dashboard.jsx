import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Welcome, {user?.name || 'User'} 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Explore comics, manage your profile, and enjoy your online comic library.
          </p>
          <p className="mt-3 text-sm font-medium text-blue-700">
            Role: {user?.role}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Link
            to="/browse"
            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition border"
          >
            <div className="text-4xl mb-4">📚</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Browse Comics</h2>
            <p className="text-gray-600">
              Search and explore all comics available in the library.
            </p>
          </Link>

          <Link
            to="/profile"
            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition border"
          >
            <div className="text-4xl mb-4">👤</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Profile</h2>
            <p className="text-gray-600">
              View and update your personal profile details.
            </p>
          </Link>

          {user?.role === 'Admin' && (
            <Link
              to="/comics"
              className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition border"
            >
              <div className="text-4xl mb-4">🛠️</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Manage Comics</h2>
              <p className="text-gray-600">
                Add, edit, and delete comics from the library.
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;