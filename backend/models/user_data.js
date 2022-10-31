const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const user_dataSchema = new Schema({
    orders:         [{
                        type: mongoose.Types.ObjectId,
                        required: true,
                        ref: 'Order'

                    }],
    addresses:      [{
                        type: mongoose.Types.ObjectId, 
                        required: true,
                        ref: 'Address'
                    }]
});

user_dataSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User_Data', user_dataSchema);