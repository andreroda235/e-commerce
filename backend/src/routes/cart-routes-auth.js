const express = require('express');
const { check } = require('express-validator');

const cartController = require('../controllers/cart-controller');

const router = express.Router();
        

router.get('/', cartController.getUserCart);
router.post('/update', cartController.updateUserCart);
router.post('/remove', cartController.removeItemFromCart);

module.exports = router;