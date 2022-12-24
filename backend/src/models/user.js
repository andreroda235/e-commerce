const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:     {type: String, required: true},
    lastName:      {type: String, required: true},
    email:         {type: String, required: true, unique: true},
    password:      {type: String, required: true, minlength: 6},
    image:         {type: String},
    admin:         {type: Boolean, required: true},
    cart:          {
                    totalItems:    {type: Number, required: true},
                    totalPrice:    {type: Number, required: true},
                    items:         [{
                                        itemId:    { type: mongoose.Types.ObjectId,
                                                    required: true,
                                                    ref: 'Item'},
                                        quantity:  {type: Number, required: true},
                                        _id: false
                                    }]
                    },
    user_data:     {
                    type: mongoose.Types.ObjectId, 
                    /* required: true, */
                    ref: 'User_Data'
                    }
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);