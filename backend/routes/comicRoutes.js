const express = require('express');
const router = express.Router();

const {
  getComics,
  getComicById,
  createComic,
  updateComic,
  deleteComic,
} = require('../controllers/comicController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getComics)
  .post(protect, adminOnly, createComic);

router.route('/:id')
  .get(protect, getComicById)
  .put(protect, adminOnly, updateComic)
  .delete(protect, adminOnly, deleteComic);

module.exports = router;