const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    active: { type: Boolean, default: true },
    role: { type: String, default: 'User' },
    createdDate: { type: Date },
    updatedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('users', schema);
