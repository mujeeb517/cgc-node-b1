const express = require('express');
const bookCtrl = require('../controllers/booksCtrl');
const router = express.Router();

// GET localhost:3000/api/books
// POST localhost:3000/api/books
router.get('/', bookCtrl.books);
router.post('/', bookCtrl.post);
router.get('/authors', bookCtrl.authors);
router.get('/:id', bookCtrl.getById);

module.exports = router;