const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const { reviewSchema } = require('./review');

const item_dataSchema = new Schema({
    fullDescription: {type: String, required: true},
    //top 10 reviews
    reviews:        [ 
                        reviewSchema,
                        {
                            type: mongoose.Types.ObjectId, 
                            required: true,
                            ref: 'Review'
                        },
                        
                    ]
});

item_dataSchema.plugin(uniqueValidator);

module.exports  = mongoose.model('Item_Data', item_dataSchema);