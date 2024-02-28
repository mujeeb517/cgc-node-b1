const express = require('express');
const productCtrl = require('../controllers/productCtrl');
const router = express.Router();

// /api/v1/products
router.get('/', productCtrl.get);

module.exports = router;