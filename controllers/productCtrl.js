const productRepo = require('../repositories/productRepo');
const logger = require('../utils/logger');

// event loop
// filtering, pagination, sort
// search box apple -> api/v1/products/page/1/size/10?search=apple&sort=price&direction=desc
// authentication
// authorization
// file upload
// reviews
// avg rating (aggregation)
// logging
// deployment
const get = async (req, res) => {
    try {
        logger.info('fetching products');
        const options = {
            size: req.params.size || 10,
            page: req.params.page || 1,
            search: req.query.search,
            sort: req.query.sort || 'updatedDate',
            direction: req.query.direction || 'desc'
        };
        const data = await productRepo.get(options);
        const rows = await productRepo.getCount(options.search);
        const pages = Math.ceil(rows / options.size);
        logger.info('fetched products');
        const metadata = {
            rows,
            pages
        };

        const response = {
            data,
            metadata
        };

        res.status(200);
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500);
        res.send('Internal Server Error');
    }
};

const getById = async (req, res) => {
    const id = req.params.id;
    const data = await productRepo.getById(id);
    if (!data) {
        res.status(404);
        res.send('Not found')
    } else {
        res.status(200);
        res.json(data);
    }
};

const post = async function (req, res) {
    try {
        const { body } = req;
        await productRepo.create(body);
        res.status(201);
        res.send('Created');
    } catch (err) {
        res.status(500);
        res.send('Internal server error');
    }
}

// api/v1/products/abc-123 DELETE
// only admins can delete
const remove = async (req, res) => {
    try {
        const id = req.params.id;
        await productRepo.remove(id);
        res.status(204);
        res.send();
    } catch (err) {
        res.status(500);
        res.send('Internal Server Error');
    }
};

// update
const put = async (req, res) => {
    try {
        const id = req.params.id;
        await productRepo.update(id, req.body);
        res.status(204);
        res.send();
    } catch (err) {
        res.status(500);
        res.send('Internal Server Error');
    }
};

module.exports = {
    get,
    post,
    getById,
    remove,
    put,
}

/*
Total Rows: 101
page size: 10

total pages:  Math.ceil(total rows)/page size

1 2 3 ... 10

1: 1 -10   skip: 0   (1-1)*10 = 0
2: 11 - 20 skip: 10  (2-1)*10 = 10
3: 21 - 30  skip: 20 (3-1)* 10 = 20
4: 31 - 40 skip: 30  (4-1)*10 = 30

( current page - 1 ) * pageSize
*/