const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Item = require("../models/item");
const Item_Data = require("../models/item_data");
const User = require("../models/user");

const createItem = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return next(
        new HttpError(
            "Invalid fields passed, please checck your data: " + JSON.stringify(errors),
            422
            ));

    const userId = req.body.userId;
    console.log(req.body);
    let existingUser;
    try {
        existingUser = await User.findById({ '_id' : userId});
    } catch (error) {
        return next(new HttpError(
            'Fetching operation failed.',
            500
        ));
    }

    if(!existingUser)
        return next(new HttpError(
            'User not found',
            404
        ));
    
    if(!existingUser.admin)
        return next(new HttpError(
            'Operation denied',
            401
        ));

    const { 
        title, 
        briefDesc, 
        description, 
        stock,
        discount,
        category,
        subCategory,
        price,
    } = req.body;

    const newItem_Data = new Item_Data({
        fullDescription: description,
        review:          []
    });

    let newItem;
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        await newItem_Data.save({ session });

        newItem = new Item({
            title,
            briefDesc,
            stock,
            discount,
            category,
            subCategory,
            price,
            item_data: newItem_Data,
        });

        await newItem.save({ session });
        session.commitTransaction();
    } catch (error) {
         return next(new HttpError(
            'Failed to create item.',
            500
        ));
    }

    res.status(201).json({ item: newItem });
};

exports.createItem = createItem;