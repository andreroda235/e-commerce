const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    timestamp:   {type: Date, required: true},
    total:       {type: String, required: true},
    discount:    {type: String, required: true},
    items:       [
                    {
                        itemName:   {type: String, required: true},
                        price:      {type: Number, required: true},
                        quantity:   {type: Number, required: true},
                        ref: 
                            {
                                type: mongoose.Types.ObjectId,
                                required: true,
                                ref: 'Item'
                            },
                    }
                 ]
});

orderSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Order', orderSchema);
exports.orderSchema = orderSchema;