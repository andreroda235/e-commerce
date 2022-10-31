const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const addressSchema = new Schema({
    line1:       {type: String, required: true},
    line2:       {type: String, required: true},
    postalCode:  {type: String, required: true},
    location:    {type: String, required: true},
    country:     {type: String, required: true}
});

addressSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Address', addressSchema);
exports.addressSchema = addressSchema;