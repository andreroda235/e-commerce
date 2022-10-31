const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    username:       {type: String, required: true, unique: true},
    comment:        {type: String, required: true},
    stars:          {type: Number, required: true, min: 0, max: 5},
    likes:          {type: Number, required: true},
    dislikes:       {type: Number, required: true},
});

reviewSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Review', reviewSchema);
exports.reviewSchema = reviewSchema;