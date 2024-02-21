const books = (req, res) => {
    const books = [{
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
    res.json(books);
};

const authors = function (req, res) {
    res.send('Authors');
};

module.exports = {
    books,
    authors,
};