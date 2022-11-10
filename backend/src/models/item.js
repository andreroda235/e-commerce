const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title:          {type: String, required: true, unique: true},
    briefDesc:      {type: String, required: true},
    stock:          {type: Number, required: true},
    discount:       {type: Number, required: true},
    category:       {type: String, required: true},
    subCategory:    {type: String, required: true},
    
    price:          {type: Number, required: true},
    item_data:      [{
                        type: mongoose.Types.ObjectId, 
                        required: true,
                        ref: 'item_data'
                    }]
});

itemSchema.plugin(uniqueValidator);

itemSchema.index({ category : 1, subCategory : 1 });
itemSchema.index({ price : 1 });
itemSchema.index({ discount: -1 });
itemSchema.index({ title: "text" });

module.exports = mongoose.model('Item', itemSchema);

/* const item = {
    imgSrc      : 'https://m.media-amazon.com/images/I/61JOiGPnVFL._AC_UY218_.jpg',
    title       : '2022 ASUS 14" HD Laptop',
    description : "Intel Celeron N4020 Processor, 4GB RAM, 64GB eMMC , Webcam, Intel HD Graphics 500, Bluetooth, Windows 11 S, Rose Gold, 128GB SnowBell USB Card",
    stock       : 20,
    discount    : 0.4,
    price       : 209.99,
    id          : 0
} */