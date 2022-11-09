const express = require('express');
const { check } = require('express-validator');

const itemsController = require('../controllers/items-controller');

const router = express.Router();
        

router.get('/:itemId', itemsController.getItem);

module.exports = router;