const bunyan = require('bunyan');
const path = require('path');

// Debug
// info
// warn
// error
// fatal

const logger = bunyan.createLogger(
    {
        name: 'cgc-b1',
        streams: [
            {
                level: 'info',
                stream: process.stdout
            },
            {
                level: 'info',
                path: path.join('logs', 'app.log')
            }
        ]
    }
);

module.exports = logger;