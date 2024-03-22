const Review = require('../models/reviewModel');

const add = (review) => {
    const item = new Review(review);
    return item.save();
};

module.exports = {
    add,
};