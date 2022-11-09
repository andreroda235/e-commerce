const Item = require("../models/item");

const getItem = async (req, res, next) => {
    const itemId = req.params.itemId;

    let existingItem;    
    try {
        existingItem = await Item.findById(itemId).populate('item_data');
    } catch (error) {
        return next(new HttpError(
            'Fetching operation failed.',
            500
        ));
    }

    if(!existingItem)
        return next(new HttpError(
            'Item not found.',
            404
        ));
    
    res.status(201).json({ item: existingItem });
    
};

exports.getItem = getItem;