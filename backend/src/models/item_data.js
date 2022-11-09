const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const item_dataSchema = new Schema({
    fullDescription: {type: String, required: true},
    //top 10 reviews
    reviews:        [ 
                        [{
                            username:       {type: String, required: true, unique: true},
                            comment:        {type: String, required: true},
                            stars:          {type: Number, required: true, min: 0, max: 5},
                            likes:          {type: Number, required: true},
                            dislikes:       {type: Number, required: true},
                        }],
                        {
                            type: mongoose.Types.ObjectId, 
                            required: true,
                            ref: 'Review'
                        },
                        
                    ]
});

item_dataSchema.plugin(uniqueValidator);

module.exports  = mongoose.model('Item_Data', item_dataSchema);