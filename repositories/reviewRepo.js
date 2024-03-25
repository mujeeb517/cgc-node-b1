const Review = require('../models/reviewModel');

const add = (review) => {
    const item = new Review(review);
    return item.save();
};

const get = (productId) => {
    return Review.find({ productId: productId }, { __v: 0, _id: 0 });
};

const getAvgRating = (productId) => {
    return Review.aggregate(
        [
            { $match: { productId: productId } },
            { $group: { _id: '$productId', avg: { $avg: '$rating' } } },
            { $project: { _id: 0 } }
        ]
    );
};


module.exports = {
    add,
    get,
    getAvgRating,
};