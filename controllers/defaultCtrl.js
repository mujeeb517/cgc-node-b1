/*
1xx -> information
2xx -> success 200, 201, 204 
3xx -> redirects
4xx -> client error 404, 401 
5xx -> server error 501 
*/
class DefaultCtrl {
    home(req, res) {
        res.status(200);
        res.send('Express API');
    };

    health(req, res) {
        console.log(req.id, "id");
        res.status(200);
        res.json({ status: 'Up' });
    };
}

module.exports = new DefaultCtrl();