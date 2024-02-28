const express = require('express');
const productCtrl = require('../controllers/productCtrl');
const router = express.Router();

// /api/v1/products
router.get('/', productCtrl.get);
router.get('/:id', productCtrl.getById);
router.post('/', productCtrl.post);
router.delete('/:id', productCtrl.remove);
router.put('/:id', productCtrl.put);

module.exports = router;