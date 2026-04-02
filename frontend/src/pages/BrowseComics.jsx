import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const BrowseComics = () => {
  const { user } = useAuth();
  const [comics, setComics] = useState([]);
  const [filteredComics, setFilteredComics] = useState([]);
  const [search, setSearch] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const fetchComics = async () => {
    if (!user?.token) return;

    try {
      setIsFetching(true);
      const response = await axiosInstance.get('/api/comics', {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const data = Array.isArray(response.data) ? response.data : [];
      setComics(data);
      setFilteredComics(data);
    } catch (error) {
      console.error('Error fetching comics:', error.response?.data || error.message);
      setComics([]);
      setFilteredComics([]);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchComics();
    }
  }, [user]);

  useEffect(() => {
    const filtered = comics.filter((comic) =>
      comic.title.toLowerCase().includes(search.toLowerCase()) ||
      comic.author.toLowerCase().includes(search.toLowerCase()) ||
      comic.genre.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredComics(filtered);
  }, [search, comics]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📚 Browse Comics</h1>
          <p className="text-gray-600 text-lg">
            Discover and explore your comic collection
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 mb-8">
          <input
            type="text"
            placeholder="Search by title, author, or genre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {isFetching ? (
          <p className="text-center text-gray-500">Loading comics...</p>
        ) : filteredComics.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
            No comics found.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComics.map((comic) => (
              <div
                key={comic._id}
                className="bg-white rounded-2xl shadow border overflow-hidden hover:shadow-lg transition"
              >
                {comic.image ? (
                  <div className="h-64 bg-gray-100 flex items-center justify-center p-4">
                    <img
                      src={comic.image}
                      alt={comic.title}
                      className="max-h-full w-auto object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-64 bg-gray-100 flex items-center justify-center text-gray-400 text-lg">
                    No Image
                  </div>
                )}

                <div className="p-5">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {comic.title}
                  </h2>

                  <p className="text-gray-700 mb-1">
                    <span className="font-semibold">Author:</span> {comic.author}
                  </p>

                  <p className="text-gray-700 mb-3">
                    <span className="font-semibold">Genre:</span> {comic.genre}
                  </p>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {comic.description}
                  </p>

                  <Link
                    to={`/comics/${comic._id}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseComics;