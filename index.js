const express = require('express');
const mongoose = require('mongoose');

const defaultRoutes = require('./routes/defaultRouter');
const bookRoutes = require('./routes/bookRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

app.use(express.json());
mongoose.connect('mongodb://localhost:27017/cgc-b1');
console.log('db connected');

function middleware(req, res, next) {
    req.id = "abc-123";
    next();
}

app.use('/', defaultRoutes);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/users', userRoutes);

app.use(middleware);
app.use('/api/v1/products', productRoutes);

// schema, model
// structure
// employee, student
// REST api
// Representational state transfer
// Everything is a resource
// 5 principles
// product POST

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

// GET all
// GET by id
// POST
// delete
// update