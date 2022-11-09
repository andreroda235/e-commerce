const express = require('express');
const { check } = require('express-validator');

const authItemsController = require('../controllers/items-controller-auth');
/* const fileUpload = require('../middleware/file-upload');
 */
const router = express.Router();

/* title, 
briefDesc, 
description, 
stock,
discount,
category,
subCategory,
price, */

router.post('/new-item',
    [
        check('title').not().isEmpty(),
        check('briefDesc').not().isEmpty(),
        check('description').not().isEmpty(),
        check('stock').not().isEmpty(),
        check('category').not().isEmpty(),
        check('subCategory').not().isEmpty(),
        check('price').not().isEmpty(),
    ], authItemsController.createItem);

module.exports = router;