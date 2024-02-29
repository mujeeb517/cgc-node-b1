const express = require('express');
const productCtrl = require('../controllers/productCtrl');
const router = express.Router();

// GET /api/v1/products/page/1/size/10
router.get('/', productCtrl.get);
router.get('/page/:page/size/:size', productCtrl.get);

router.get('/:id', productCtrl.getById);
router.post('/', productCtrl.post);
router.delete('/:id', productCtrl.remove);
router.put('/:id', productCtrl.put);

module.exports = router;
 