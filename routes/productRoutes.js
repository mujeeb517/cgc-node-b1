const express = require('express');
const productCtrl = require('../controllers/productCtrl');
const auth = require('../middlewares/auth');
const multer = require('multer');
const router = express.Router();

// timestamp
// random(120)+2024-03-21 8:17:37ip13.jpeg
// file system 1MB, 100MB, 1GB
// validations
// reviews
// aggregation
// aggregation pipeline
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        const prefix = Math.round(Math.random() * 1e9);
        const timestamp = Date.now();
        const filename = prefix + '-' + timestamp + '-' + file.originalname;
        req.body.image = filename;
        cb(null, filename);
    },
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    }
});

const upload = multer({ storage: storage });


// content servers
// app + content server
// GET /api/v1/products/page/1/size/10
router.get('/', productCtrl.get);
router.get('/page/:page/size/:size', productCtrl.get);

router.get('/:id', productCtrl.getById);

router.post('/', upload.single('image'), productCtrl.post);

router.delete('/:id', auth.authorizeAdmin, productCtrl.remove);
router.put('/:id', productCtrl.put);

module.exports = router;
