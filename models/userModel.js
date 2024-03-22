const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Firstname is mandatory'],
        minLength: [3, 'min 3 chars'],
        maxLength: [20, 'max 20 chars']
    },
    lastName: {
        type: String,
        required: [true, "Lastname is required"]
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email'
        }
    },
    password: { type: String },
    active: { type: Boolean, default: true },
    role: { type: String, default: 'User' },
    createdDate: { type: Date },
    updatedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('users', schema);