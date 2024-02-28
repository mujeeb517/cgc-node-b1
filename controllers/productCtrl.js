const Product = require('../models/productModel');

const get = async (req, res) => {
    try {
        const data = await Product.find({}, { __v: 0 });
        res.status(200);
        res.json(data);
    } catch (err) {
        res.status(500);
        res.send('Internal Server Error');
    }
};

const getById = async (req, res) => {
    const id = req.params.id;
    const data = await Product.findById(id, { __v: 0 });
    if (!data) {
        res.status(404);
        res.send('Not found')
    } else {
        res.status(200);
        res.json(data);
    }
};

const post = async function (req, res) {
    try {
        const { body } = req;
        const product = new Product(body);
        await product.save();
        res.status(201);
        res.send('Created');
    } catch (err) {
        res.status(500);
        res.send('Internal server error');
    }
}

// api/v1/products/abc-123 DELETE
const remove = async (req, res) => {
    try {
        const id = req.params.id;
        await Product.deleteOne({ _id: id });
        res.status(204);
        res.send();
    } catch (err) {
        res.status(500);
        res.send('Internal Server Error');
    }
};

// update
const put = async (req, res) => {
    try {
        const id = req.params.id;
        await Product.updateOne({ _id: id }, req.body);
        res.status(204);
        res.send();
    } catch (err) {
        res.status(500);
        res.send('Internal Server Error');
    }
};


module.exports = {
    get,
    post,
    getById,
    remove,
    put,
}