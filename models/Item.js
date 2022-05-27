const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ItemSchema = new Schema({
    id: Number,
    imageUrl: String,
    title: String,
    types: [Number],
    sizes: [Number],
    price: Number,
    category: Number,
    rating: Number
})

const Item = mongoose.model('item', ItemSchema);
module.exports = Item;