// sign up
const User = require('../models/userModel');

const add = (data) => {
    const user = new User(data);
    return user.save();
};

const getUserByEmail = (email) => {
    return User.findOne({ email: email },
        { __v: 0, createdDate: 0, updatedDate: 0, _id: 0 })
};

module.exports = {
    add,
    getUserByEmail,
}