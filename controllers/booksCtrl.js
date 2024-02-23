// Books
// Book by id
// Create new book
// update book
// delete book
// patch book
// REST api
// Get all books
// Get by id
// Create book
// delete book
// id
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

// POST
// http://localhost:3000/books
// body {}
// validations
const isInvalid = (body) => {
    return !body.name || !body.price || !body.author;
};

const post = function (req, res) {
    const { body } = req;

    if (isInvalid(body)) {
        res.status(400);
        res.send('Bad Request');
    } else {
        booksDb.push(body);
        res.status(201);
        res.send('Created');
    }
};

const remove = (req, res) => {
    const id = +req.params.id;

    for (let i = 0; i < booksDb.length; i++) {
        if (booksDb[i].id === id) {
            booksDb.splice(i, 1);
            break;
        }
    }

    res.status(204);
    res.send();
};

// full update
const put = (req, res) => {
    const id = +req.params.id;
    const payload = req.body;

    if (isInvalid(payload)) {
        res.status(400);
        res.send('Bad Request');
        return;
    }

    for (let i = 0; i < booksDb.length; i++) {
        if (booksDb[i].id === id) {
            booksDb[i].price = payload.price;
            booksDb[i].name = payload.name;
            booksDb[i].author = payload.author;
        }
    }

    res.status(204);
    res.send();
};

// partial update
const patch = (req, res) => {
    const id = +req.params.id;
    const payload = req.body;

    for (let i = 0; i < booksDb.length; i++) {
        if (booksDb[i].id === id) {
            for (let key in payload) {
                booksDb[i][key] = payload[key];
            }
        }
    }

    res.status(204);
    res.send();

};

module.exports = {
    books,
    authors,
    getById,
    post,
    remove,
    put,
    patch,
};