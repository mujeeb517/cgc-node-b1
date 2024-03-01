const Product = require('../models/productModel');

const getFilterExp = (search) => {
    return {
        $or: [
            { brand: new RegExp(search, 'i') },
            { model: new RegExp(search, 'i') }
        ]
    };
};

const getCount = (search) => {
    const filter = getFilterExp(search);
    return Product.countDocuments(filter);
};

const get = (current, size, search, sort, direction) => {
    const rowsToSkip = (current - 1) * size;
    const filter = getFilterExp(search);

    let sortDir = 1;
    if (direction.toLowerCase() === 'desc') {
        sortDir = -1;
    }

    return Product
        .find(filter, { __v: 0 })
        .sort({ [sort]: sortDir })
        .skip(rowsToSkip)
        .limit(size);
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
    getCount,
}

