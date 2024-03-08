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
        res.send('Express API!!');
    };

    health(req, res) {
        console.log(req.id, "id");
        res.status(200);
        res.json({ status: 'Up' });
    };
}

module.exports = new DefaultCtrl();

/*
    Contents
    Chapter 1 :  1
    Chapter 2:  20
    Chapter 3:  56
    Chapter 4: 100


    indexes:
    admin@gmail.com -- 56575
    apple:   ---- 567890
*/