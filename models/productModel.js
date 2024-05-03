const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: Boolean,
    discount: Number,
    createdDate: Date,
    image: String,
    updatedDate: {
        type: Date,
        default: Date.now
    }
});

schema.index({ brand: 1, model: 1 });

module.exports = mongoose.model('product', schema);

