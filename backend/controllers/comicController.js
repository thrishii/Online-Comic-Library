const Comic = require('../models/Comic');

// GET all comics for library browse
exports.getComics = async (req, res) => {
  try {
    const comics = await Comic.find().sort({ createdAt: -1 });

    console.log('Fetched comics count:', comics.length);

    return res.status(200).json(comics);
  } catch (error) {
    console.error('Error fetching comics:', error.message);
    return res.status(500).json({ message: 'Error fetching comics' });
  }
};

// GET single comic by ID
exports.getComicById = async (req, res) => {
  try {
    const comic = await Comic.findById(req.params.id);

    if (!comic) {
      return res.status(404).json({ message: 'Comic not found' });
    }

    return res.status(200).json(comic);
  } catch (error) {
    console.error('Error fetching comic details:', error.message);
    return res.status(500).json({ message: 'Error fetching comic details' });
  }
};

// CREATE comic (Admin only from route protection)
exports.createComic = async (req, res) => {
  try {
    const { title, author, genre, description, image } = req.body;

    if (!title || !author || !genre || !description) {
      return res.status(400).json({
        message: 'Please provide title, author, genre, and description',
      });
    }

    const comic = await Comic.create({
      title: title.trim(),
      author: author.trim(),
      genre: genre.trim(),
      description: description.trim(),
      image: image?.trim() || '',
      user: req.user.id,
    });

    return res.status(201).json(comic);
  } catch (error) {
    console.error('Error creating comic:', error.message);
    return res.status(500).json({ message: 'Error creating comic' });
  }
};

// UPDATE comic (Admin only from route protection)
exports.updateComic = async (req, res) => {
  try {
    const comic = await Comic.findById(req.params.id);

    if (!comic) {
      return res.status(404).json({ message: 'Comic not found' });
    }

    const { title, author, genre, description, image } = req.body;

    comic.title = title?.trim() || comic.title;
    comic.author = author?.trim() || comic.author;
    comic.genre = genre?.trim() || comic.genre;
    comic.description = description?.trim() || comic.description;
    comic.image = image?.trim() || comic.image;

    const updatedComic = await comic.save();

    return res.status(200).json(updatedComic);
  } catch (error) {
    console.error('Error updating comic:', error.message);
    return res.status(500).json({ message: 'Error updating comic' });
  }
};

// DELETE comic (Admin only from route protection)
exports.deleteComic = async (req, res) => {
  try {
    const comic = await Comic.findById(req.params.id);

    if (!comic) {
      return res.status(404).json({ message: 'Comic not found' });
    }

    await comic.deleteOne();

    return res.status(200).json({ message: 'Comic deleted successfully' });
  } catch (error) {
    console.error('Error deleting comic:', error.message);
    return res.status(500).json({ message: 'Error deleting comic' });
  }
};