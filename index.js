const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const defaultRoutes = require('./routes/defaultRouter');
const bookRoutes = require('./routes/bookRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const auth = require('./middlewares/auth');

const app = express();
const port = 3000;

const logsDir = path.join(__dirname, "logs");

if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

const fsStream = fs.createWriteStream(path.join(__dirname, 'logs', 'request.log'), { flags: 'a' });

app.use(morgan('dev'));
app.use(morgan('combined', { stream: fsStream }));
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/cgc-b1');
console.log('db connected');

app.use('/', defaultRoutes);
app.use('/api/v1/users', userRoutes);

// app.use(auth.basicAuth);
app.use(auth.tokenAuth);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/books', bookRoutes);
