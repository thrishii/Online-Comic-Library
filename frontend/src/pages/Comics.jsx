import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useAuth } from '../context/AuthContext';

const Comics = () => {
  const { user } = useAuth();
  const [comics, setComics] = useState([]);
  const [editingComic, setEditingComic] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [search, setSearch] = useState('');

  const fetchComics = async () => {
    if (!user?.token) return;

    try {
      setIsFetching(true);
      const response = await axiosInstance.get('/api/comics', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setComics(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching comics:', error.response?.data || error.message);
      setComics([]);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchComics();
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== 'Admin') {
    return <Navigate to="/browse" />;
  }

  const filteredComics = comics.filter((comic) =>
    comic.title.toLowerCase().includes(search.toLowerCase()) ||
    comic.author.toLowerCase().includes(search.toLowerCase()) ||
    comic.genre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">📚 Manage Comics</h1>
        <p className="text-center text-gray-600 mb-6">
          Admin panel for adding, editing, and deleting comics
        </p>

        <div className="bg-white p-4 rounded shadow mb-6">
          <input
            type="text"
            placeholder="Search by title, author, or genre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <TaskForm
          fetchComics={fetchComics}
          editingComic={editingComic}
          setEditingComic={setEditingComic}
        />

        {isFetching ? (
          <p className="text-center text-gray-500 mt-4">Loading comics...</p>
        ) : (
          <TaskList
            comics={filteredComics}
            fetchComics={fetchComics}
            setEditingComic={setEditingComic}
          />
        )}
      </div>
    </div>
  );
};

export default Comics;