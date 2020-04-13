const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outputSchema = new Schema({
   debtor: { type: String, required: true },
   phone: { type: String },
   paidPrice: { type: Number },
   debtPrice: { type: Number },
   paidDate: { type: Date },
   deadlineDate: { type: Date},
   products: [{
      productId: { type: Schema.Types.ObjectId, ref: 'products', required: true },
      amount: { type: Number, required: true },   
   }]
})

module.exports = mongoose.model('output', outputSchema);