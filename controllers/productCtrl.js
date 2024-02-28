const Product = require('../models/productModel');

const get = (req, res) => {
    Product.find()
        .then(data => {
            res.status(200);
            res.json(data);
        })
        .catch(err => {
            res.status(500);
            res.send('Internal Server Error');
        });
};


module.exports = {
    get,
}