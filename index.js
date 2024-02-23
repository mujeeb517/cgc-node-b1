const express = require('express');

const defaultRoutes = require('./routes/defaultRouter');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const port = 3000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

app.use(express.json());

app.use('/', defaultRoutes);
app.use('/api/v1/books', bookRoutes);

// REST api
// Representational state transfer
// Everything is a resource
// 5 principles

// index.js -> routes -> controllers

// concept
// NodeJS
// Java Spring boot
// .Net Web api
// Django
// client server 
// Uniform interface (GET, POST, PUT, DELETE, PATCH)
// GET: read
// POST: create
// PUT: update
// DELETE: delete
// PATCH: partial update
// list of books
// Stateless: new request, scalability
// cacheability 
// layered system
