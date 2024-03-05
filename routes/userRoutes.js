const express = require('express');
const userCtrl = require('../controllers/userCtrl');

const router = express.Router();

router.post('/signup', userCtrl.signup);
router.post('/signin', userCtrl.signin);

module.exports = router;

// model -> repo -> ctrl -> routes -> index.js