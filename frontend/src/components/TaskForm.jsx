import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const TaskForm = ({ fetchComics, editingComic, setEditingComic }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    image: '',
  });

  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (editingComic) {
      setFormData({
        title: editingComic.title || '',
        author: editingComic.author || '',
        genre: editingComic.genre || '',
        description: editingComic.description || '',
        image: editingComic.image || '',
      });

      setImagePreview(editingComic.image || '');
    } else {
      setFormData({
        title: '',
        author: '',
        genre: '',
        description: '',
        image: '',
      });

      setImagePreview('');
    }
  }, [editingComic]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 👇 image preview logic
    if (name === 'image') {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.author.trim() ||
      !formData.genre.trim() ||
      !formData.description.trim()
    ) {
      alert('All fields except image are required');
      return;
    }

    try {
      if (editingComic) {
        await axiosInstance.put(`/api/comics/${editingComic._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEditingComic(null);
      } else {
        await axiosInstance.post('/api/comics', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      }

      setFormData({
        title: '',
        author: '',
        genre: '',
        description: '',
        image: '',
      });

      setImagePreview('');

      await fetchComics();
    } catch (error) {
      console.error('Save comic error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Error saving comic');
    }
  };

  const handleCancelEdit = () => {
    setEditingComic(null);
    setFormData({
      title: '',
      author: '',
      genre: '',
      description: '',
      image: '',
    });
    setImagePreview('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-6 border rounded bg-white shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {editingComic ? '✏️ Edit Comic' : '➕ Add Comic'}
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Comic Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        type="text"
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
        className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        type="text"
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
        className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows="4"
        required
      />

      <input
        type="text"
        name="image"
        placeholder="Paste Image URL here..."
        value={formData.image}
        onChange={handleChange}
        className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {imagePreview && (
        <div className="mb-4 bg-gray-100 border rounded p-3 flex justify-center items-center">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-h-64 w-auto object-contain rounded border mx-auto"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          {editingComic ? 'Update Comic' : 'Save Comic'}
        </button>

        {editingComic && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;