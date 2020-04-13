const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    order: { type: Number },
    categoryId: { type: Schema.Types.ObjectId, ref: 'categories' },
}, 
// { timestamps: true }
)

module.exports = mongoose.model('product', productSchema);