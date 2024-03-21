const bcrypt = require('bcrypt');
const userRepo = require('../repositories/userRepo.js');
const jwt = require('jsonwebtoken');
const config = require('../config');
const logger = require('../utils/logger');
const { errorMonitor } = require('bunyan');


const emailExists = (err) => err.message
    && err.message.indexOf('duplicate key error') > -1

const isInvalid = (err) => err.message
    && err.message.indexOf('validation failed') > -1;

const signup = async (req, res) => {
    try {
        logger.info('singup started');
        const payload = req.body;
        payload.role = 'User';
        payload.password = await bcrypt.hash(payload.password, 2);
        payload.createdDate = new Date();
        await userRepo.add(payload);
        res.status(201);
        res.send('Created');
    } catch (err) {
        logger.error({
            location: 'UserCtrl',
            err: err
        });
        if (isInvalid(err)) {
            res.status(400);
            res.json(err.errors);
        }
        else if (emailExists(err)) {
            res.status(400);
            res.send('Email already exist');
        } else {
            res.status(500);
            res.send('Internal server error');
        }
    }
};

const signin = async (req, res) => {
    try {
        const body = req.body;
        const dbUser = await userRepo.getUserByEmail(body.email);
        if (!dbUser) {
            res.status(401);
            res.send('Invalid email or password');
            return;
        }

        const isValid = await bcrypt.compare(body.password, dbUser.password);
        if (isValid) {
            res.status(200);
            res.json({
                firstName: dbUser.firstName,
                lastName: dbUser.lastName,
                token: jwt.sign({
                    email: dbUser.email,
                    role: dbUser.role
                }, config.jwtSecret, {
                    expiresIn: '1d'
                })
            });
        } else {
            res.status(401);
            res.send('Invalid email or password');
        }
    } catch (err) {
        res.status(500);
        res.send('Internal server error');
    }
};

module.exports = {
    signup,
    signin,
}