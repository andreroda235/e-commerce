const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/user");


const getUserCart = async (req, res, next) => {
    const userId = req.body.userId;
    
    let existingUser;
    try {
        existingUser = await User.findById(userId).populate('items');
    } catch (error) {
        return next(new HttpError(
            'Fetching operation failed.',
            500
        ));
    }

    if(!existingUser)
    return next(new HttpError(
        'User not found.',
        404
    ));

    const userCart = existingUser.cart;

    console.log(userCart);

    res.status(200).json(userCart);
};