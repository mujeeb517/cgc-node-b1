// sign up
const User = require('../models/userModel');

const add = (data) => {
    const user = new User(data);
    return user.save();
};

module.exports = {
    add,
}