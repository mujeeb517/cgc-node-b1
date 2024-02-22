// Books
// Book by id
// Create new book
// update book
// delete book
// patch book
const booksDb = [{
    id: 1,
    name: 'Clean Code',
    rating: 4,
    author: 'Robert Martin',
    price: 50
}, {
    id: 2,
    name: 'Clean Coder',
    rating: 4.5,
    author: 'Robert Martin',
    price: 50
}];

const books = (req, res) => {
    res.json(booksDb);
};

const getById = (req, res) => {
    const id = parseInt(req.params.id);

    const filterFn = (elem) => {
        return elem.id === id;
    };
    const filteredBooks = booksDb.filter(filterFn);

    if (filteredBooks[0]) {
        res.status(200);
        res.json(filteredBooks[0]);
    } else {
        res.status(404);
        res.send('Not found');
    }
};

// index.js -> routes -> controllers -> service -> repo

const authors = function (req, res) {
    res.send('Authors');
};

module.exports = {
    books,
    authors,
    getById,
};