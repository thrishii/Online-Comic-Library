import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const ComicDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [comic, setComic] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchComicDetails = async () => {
      if (!user?.token) return;

      try {
        setIsFetching(true);

        const response = await axiosInstance.get(`/api/comics/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setComic(response.data);
      } catch (error) {
        console.error('Error fetching comic details:', error.response?.data || error.message);
        setComic(null);
      } finally {
        setIsFetching(false);
      }
    };

    fetchComicDetails();
  }, [id, user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (isFetching) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading comic details...</p>
      </div>
    );
  }

  if (!comic) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Comic not found</h2>
          <Link
            to="/browse"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Browse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link
            to="/browse"
            className="inline-block bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition"
          >
            ← Back to Browse
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-hidden grid md:grid-cols-2 gap-0">
          <div className="bg-gray-100 flex items-center justify-center p-6 min-h-[400px]">
            {comic.image ? (
              <img
                src={comic.image}
                alt={comic.title}
                className="max-h-[500px] w-auto object-contain rounded"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className="text-gray-400 text-xl">No Image Available</div>
            )}
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{comic.title}</h1>

            <p className="text-lg text-gray-700 mb-3">
              <span className="font-semibold">Author:</span> {comic.author}
            </p>

            <p className="text-lg text-gray-700 mb-6">
              <span className="font-semibold">Genre:</span> {comic.genre}
            </p>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Description</h2>
              <p className="text-gray-600 leading-7">{comic.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicDetails;