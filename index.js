// Hyper text transfer protocol
// format
// two parties
// client - server
// browser - server
// https://www.google.com - files
// apache, tomcat, IIS, NodeJS
// module: file, package, module
// routing
// git -> github -> push
// git -> pull
const http = require('http');

function handler(req, res) {
    // streams
    res.write("Hello Node API");
    res.write("Second line");
    res.end();
}

// callback function
const server = http.createServer(handler);
const port = 3000;
// async
// non-blocking
// 127.0.0.1
// client - server 
// localhost - localhost
// localhost - 192.34.58.20 (www.google.com)
server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});