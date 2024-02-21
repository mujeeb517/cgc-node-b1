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
const math = require('./math');
const defaultCtrl = require('./controllers/defaultCtrl');
const bookCtrl = require('./controllers/booksCtrl');


const app = express();

const port = 3000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

app.get('/', defaultCtrl.home);
// monitoring
// 24*7
// consumers
// google maps 
// monitoring automatic
// support team
app.get('/health', defaultCtrl.health);
app.get('/books', bookCtrl.books);
app.get('/authors', bookCtrl.authors);