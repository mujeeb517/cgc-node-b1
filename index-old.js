const http = require('http');
const fs = require('fs');

function handler(req, res) {
    // routing
    // api
    // json
    // express js (framework)
    // knife
    // chopper
    switch (req.url) {
        case '/':
            const contents = fs.readFileSync('index.html');
            res.write(contents.toString());
            res.end();
            break;

        case '/books':
            const books = [{
                id: 1,
                name: 'Clean Code',
                rating: 4,
                author: 'Robert Martin',
                price: 50
            }, {
                id: 2,
                name: 'Clean Coder',
                rating: 4.5,
                author: 'Robert Martin',
                price: 50
            }];

            res.write(JSON.stringify(books));
            res.end();
            break;

        case '/authors':
            res.write('Authors API');
            res.end();
            break;

        default:
            res.write('Not found');
            res.end();
            break;
    }
}

const server = http.createServer(handler);
const port = 3000;

server.listen(port, () => console.log(`server is running on ${port}`));


// http server
// website
