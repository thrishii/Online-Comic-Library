import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const TaskList = ({ comics, fetchComics, setEditingComic }) => {
  const { user } = useAuth();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this comic?');

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/api/comics/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      await fetchComics();
    } catch (error) {
      console.error('Delete comic error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Error deleting comic');
    }
  };

  if (!comics.length) {
    return (
      <div className="bg-white p-6 rounded shadow text-center text-gray-500">
        No comics found.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {comics.map((comic) => (
        <div key={comic._id} className="bg-white p-5 rounded shadow border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{comic.title}</h2>

          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Author:</span> {comic.author}
          </p>

          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Genre:</span> {comic.genre}
          </p>

          <p className="text-gray-600 mt-3 mb-3">{comic.description}</p>

          {comic.image && (
            <div className="w-full mb-4 border rounded bg-gray-100 flex justify-center items-center p-3">
              <img
                src={comic.image}
                alt={comic.title}
                className="max-h-64 w-auto object-contain rounded"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          {user?.role === 'Admin' && (
            <div className="flex gap-3">
              <button
                onClick={() => setEditingComic(comic)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(comic._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;