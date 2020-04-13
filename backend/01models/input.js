const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inputSchema = new Schema({
   date: { type: Date },
   products: [{
      productId: { type: Schema.Types.ObjectId, ref: 'products', required: true },
      amount: { type: Number, required: true },
   }]
})

module.exports = mongoose.model('input', inputSchema);