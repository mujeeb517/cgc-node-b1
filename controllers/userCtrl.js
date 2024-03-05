const bcrypt = require('bcrypt');
const userRepo = require('../repositories/userRepo.js');

const emailExists = (err) => err.message
    && err.message.indexOf('duplicate key error') > -1

const signup = async (req, res) => {
    try {
        const payload = req.body;
        payload.password = await bcrypt.hash(payload.password, 2);
        console.log(payload);
        payload.createdDate = new Date();
        await userRepo.add(payload);
        res.status(201);
        res.send('Created');
    } catch (err) {
        console.error(err.message);
        if (emailExists(err)) {
            res.status(400);
            res.send('Email already exist');
        } else {
            res.status(500);
            res.send('Internal server error');
        }
    }
};

module.exports = {
    signup,
}