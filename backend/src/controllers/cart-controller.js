const HttpError = require("../models/http-error");
const User = require("../models/user");
const ObjectId = require('mongodb').ObjectId;


const updateUserCart = async (req, res, next) => {
    const userId = req.body.userId;
    const { itemId, quantity, totalItems, totalPrice } = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(userId);
    } catch (error) {
        return next(new HttpError(
            'Fetching operation failed.' + error,
            500
        ));
    }

    if(!existingUser)
    return next(new HttpError(
        'User not found.',
        404
    ));

    const userCart = existingUser.cart;

    //db.employees.updateMany({_id:5},{$set:{ skills:["Sales Tax"]}})
    
    if(quantity === 0)
        try {
           await User.updateOne(
                {},
                {
                    $pull: { "cart.items": {"id" : new ObjectId(itemId)} },
                }
            );
        } catch (error) {
            return next(new HttpError(
                'Something went wrong while updating cart.' + error,
                500
            ));
        };
    
    
    let result;
    try {
      result = await User.updateOne( 
            { "cart.items.id": new ObjectId(itemId) },
            { $set : {
                    "cart.items.$.quantity": quantity,
                    "cart.totalItems": totalItems,
                    "cart.totalPrice": totalPrice
                }
            },
            /* { upsert: true} */
        );
    } catch (error) {
        return next(new HttpError(
            'Something went wrong while updating cart.' + error,
            500
        ));
    }
    console.log(result);

    res.status(200).json({});
}; 

const getUserCart = async (req, res, next) => {
    const userId = req.body.userId;
    
    console.log(userId);

    let existingUser;
    try {
        existingUser = await User.findById(userId).populate('items');
    } catch (error) {
        return next(new HttpError(
            'Fetching operation failed.' + error,
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

exports.updateUserCart = updateUserCart;
exports.getUserCart    = getUserCart;