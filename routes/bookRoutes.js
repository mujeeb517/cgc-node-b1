const express = require('express');
const bookCtrl = require('../controllers/booksCtrl');
const router = express.Router();

router.get('/books', bookCtrl.books);
router.get('/authors', bookCtrl.authors);
router.get('/books/:id', bookCtrl.getById);

module.exports = router;