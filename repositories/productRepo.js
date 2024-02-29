const Product = require('../models/productModel');

const get = () => {
    return Product.find({}, { __v: 0 });
};

const getById = (id) => {
    return Product.findById(id, { __v: 0 });
}

const create = (body) => {
    const product = new Product(body);
    return product.save();
}

const remove = (id) => {
    return Product.deleteOne({ _id: id });
}

const update = (id, payload) => {
    return Product.updateOne({ _id: id }, payload);
}

module.exports = {
    get,
    getById,
    create,
    remove,
    update,
}
