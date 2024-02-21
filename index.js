// Express JS: library / package
// thrid party
// install separately 
// created server
// listen
// routing
// requests
// response
// 128GB 1TB ssd 64 core
// divide 100
const express = require('express');
const app = express();

const port = 3000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

const handler1 = (req, res) => {
    res.send('Hello Express');
};

const handler2 = (req, res) => {
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

const handler3 = function (req, res) {
    res.send('Authors');
}

app.get('/', handler1);
app.get('/books', handler2);
app.get('/authors', handler3);