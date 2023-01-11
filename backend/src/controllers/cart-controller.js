const HttpError = require("../models/http-error");
const Item = require("../models/item");
const User = require("../models/user");
const ObjectId = require('mongodb').ObjectId;

//add title and price fields
const updateUserCart = async (req, res, next) => {
    const userId = req.body.userId;
    const { itemId, quantity } = req.body;

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


    const obId = new ObjectId(itemId);
    let result;
    if(quantity === 0){
        try {
          result = await existingUser.updateOne(
                {
                    $pull: { "cart.items": {"itemId" : obId} }/* ,
                    $set: {
                        "cart.totalItems": totalItems,
                        "cart.totalPrice": totalPrice
                    } */
                }
            );
        } catch (error) {
            return next(new HttpError(
                'Something went wrong while updating cart.' + error,
                500
            ));
        };

        return res.status(200).json({});
    }

    try {
    //use find first and    
    result = await existingUser.updateOne(
            /* {"_id": uObId, "cart.items.itemId": obId}, */
            {   /* $addToSet : { "cart.items": { id: obId, quantity } }, */
                $set : {
                    "cart.items.$[elem].quantity" : quantity,
                   /*  "cart.totalItems": totalItems,
                    "cart.totalPrice": totalPrice */
                }
            },
            { 
                arrayFilters: [ 
                    { "elem.itemId":  obId }
                ],
            }
        );
    } catch (error) {
        return next(new HttpError(
            'Something went wrong while updating cart.' + error,
            500
        ));
    }

    if(result.modifiedCount === 0) {
        let existingItem;
        try {
            existingItem = await Item.findById(itemId);
        } catch (error) {
            return next(new HttpError(
                'Something went wrong while updating cart.' + error,
                500
            ));
        }

        console.log(existingItem);

        try {
            
            result = await existingUser.updateOne(
                {
                    $push: { "cart.items" : {
                        itemId: obId,
                        quantity
                    }}/* ,
                    $set: {
                        "cart.totalItems": totalItems,
                        "cart.totalPrice": totalPrice
                    } */
                }
            );
        } catch (error) {
            return next(new HttpError(
                'Something went wrong while updating cart.' + error,
                500
            ));
        }
    }

    console.log(result)

    res.status(200).json({});
}; 

const getUserCart = async (req, res, next) => {
    const userId = req.body.userId;
    
    console.log(userId);

    let existingUser;
    try {
        existingUser = await User.findById(userId)
                                 .populate('cart.items.itemId')
                                 .lean();
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

    const userCart = existingUser.cart.items.map(item => {
        return {
            title   : item.itemId.title,
            price   : item.itemId.price,
            itemId  : item.itemId._id.toString(),
            quantity: item.quantity,
        }
    });
    console.log(userCart);

    res.status(200).json({items: userCart});
};

const removeItemFromCart = async (req, res, next) => {

    const userId = req.body.userId;
    const { itemId } = req.body;

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

    
    const itemObId = new ObjectId(itemId);
    let result;
    try {
        result = await existingUser.updateOne(
            {
                $pull: { "cart.items": {"itemId" : itemObId} },
            }
        );
    } catch (error) {
        return next(new HttpError(
            'Something went wrong while removing item from cart.' + error,
            500
        ));
    }
    
    console.log(result);
    res.status(200).json({});
};

exports.removeItemFromCart = removeItemFromCart;
exports.updateUserCart     = updateUserCart;
exports.getUserCart        = getUserCart;