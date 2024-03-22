const productRepo = require('../repositories/productRepo');
const reviewRepo = require('../repositories/reviewRepo');
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
// HTML, CSS, Tailwind, React
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

        for (let i = 0; i < data.length; i++) {
            if (data[i].image) {
                const protocol = req.protocol;
                const domain = req.get('host');
                data[i].image = `${protocol}://${domain}/${data[i].image}`;
            }
        }

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
    if (data.image) {
        const protocol = req.protocol;
        const domain = req.get('host');
        data.image = `${protocol}://${domain}/${data.image}`;
    }
    if (!data) {
        res.status(404);
        res.send('Not found')
    } else {
        // fetch reviews
        const reviews = await reviewRepo.get(id);
        const response = { ...data._doc, reviews };
        res.status(200);
        res.json(response);
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

const addReview = async (req, res) => {
    try {
        const productId = req.params.id;
        const payload = req.body;
        payload.productId = productId;
        payload.createdDate = new Date();
        await reviewRepo.add(payload);
        res.status(201).send('Created');
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    get,
    post,
    getById,
    remove,
    put,
    addReview,
}

/*
   aggregation framework

   db.cities.aggregate([
     {$match: {state:'NY'}},
     {$group: {_id: '$city', totalPop: {$sum:'$pop'}} }
   ]);

    db.cities.aggregate([
        {$group: {_id: '$state', totalPop: {$sum:'$pop'}} },
        {$sort: {totalPop:1}},
        {$limit: 3},
        {$project: {state: '$_id', population:'$totalPop', _id:0}}
    ]);
*/