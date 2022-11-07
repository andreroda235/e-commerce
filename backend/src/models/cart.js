const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const cart_Schema = new Schema({
    totalItems:    {type: Number, required: true},
    totalPrice:    {type: Number, required: true},
    items:         [{
                        id:        { type: mongoose.Types.ObjectId,
                                    required: true,
                                    ref: 'Item'},
                        quantity:  {type: Number, required: true}
                    }]
});

cart_Schema.plugin(uniqueValidator);

module.exports      = mongoose.model('Cart', cart_Schema);
exports.cart_Schema = cart_Schema;