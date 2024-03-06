const jwt = require('jsonwebtoken');
const config = require('../config');

function basicAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).send('Unauthorized');
        return;
    }

    // Basic akdkdkdk==
    const authTokens = authHeader.split(' ');

    const buf = Buffer.from(authTokens[1], 'base64');
    const decoded = buf.toString();
    const tokens = decoded.split(':');
    const [username, password] = tokens;
    if (username === 'admin' && password === 'password') next();
    else res.status(401).send('Unauthorized');
}

// how to send
// read
// verify
function tokenAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).send('Unuahorized');
        return;
    }

    const tokens = authHeader.split(' ');
    const [_, authToken] = tokens; // const authToken = token[1];

    jwt.verify(authToken, config.jwtSecret, function (err, decoded) {
        if (err) {
            res.status(401).send('Unuahorized');
        } else {
            console.log(decoded);
            next();
        }
    });
}

module.exports = {
    basicAuth,
    tokenAuth,
}