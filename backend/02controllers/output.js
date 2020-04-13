const Output = require('../01models/output');
const Product = require('../01models/product');

exports.getOutputs = async (req, res, next) => {
   let range;
   let skip = 0;
   let limit = 0;
   if(req.query.range) {
      range =  JSON.parse(req.query.range);
      skip = range[0] || 0;
      limit = range[1] - skip + 1;
   }
   // Filters
   let config = {};
   if(req.query.filter){
      const filter = JSON.parse(req.query.filter);
      for(let key in filter) {
         if(key === 'date' || key === 'productId'){ 
            config[key] = filter[key]; 
         } else if (key === 'ids') {
            config['_id'] = filter[key];
         } 
         else { config[key] = { '$regex' : filter[key], '$options' : 'i' } }
      }
   }

   // SORT
   let sort = {};
   if(req.query.sort) {
      const [key, value] = JSON.parse(req.query.sort);
      sort = {
         [`${key}`]: value === 'DESC' ? -1 : 1
      }
   }

   try {
      const [totalItems, outputs] = await Promise.all([
         Output.find(config).countDocuments(),
         Output.find(config).skip(skip).limit(limit).sort(sort)
      ])
      res.status(200).json({
         data: outputs.map(p => ({
            id: p._id.toString(),
            ...p._doc
         })),
         total: totalItems
      })
   } catch(err) {
      if(!err.statusCode) {
         err.statusCode = 500;
      }
      next(err)
   }
};

exports.createOutput = async (req, res, next) => {
   try {
      const products = await Product.find({
         name: req.body.products.map(p => p.name),
         price: req.body.products.map(p => p.price)
      })
      if(products) {
         const updatedProducts = products.map((prod, i) => {
            req.body.products[i] = {
               ...req.body.products[i],
               productId: prod._id
            };
            prod.amount -= +req.body.products[i].amount;
            return prod.save();
         })
         Promise.all([
            ...updatedProducts
         ])
      }
      const output = new Output(req.body)

      const createdOutput = await output.save();

      res.status(201).json({
         ...createdOutput._doc, 
         id: createdOutput._id.toString()
      });
   } catch (err) {
      if(!err.statusCode) {
         err.statusCode = 500;
      }
      next(err)
   }
};

exports.editOutput = async (req, res, next) => {
   try {
      const output = await Output.findById(req.params.id);
      for(let key in req.body) {
         output[key] = req.body[key];
      }
      const updatedOutput = await output.save();
      res.status(201).json({
         ...updatedOutput._doc, 
         id: updatedOutput._id.toString()
      });
   } catch (err) {
      if(!err.statusCode) {
         err.statusCode = 500;
      }
      next(err)
   }
};

exports.getOutput = async (req, res, next) => {
   try {
      const output = await Output.findById(req.params.id);
      if(!output) {
         const err = new Error('Tovar topilmadi!');
         err.statusCode = 404;
         throw err;
      }
      res.status(200).json({
         data: {
               ...output._doc, 
               id: output._id.toString()
         }
      })
   } catch (err) {
      if(!err.statusCode) {
         err.statusCode = 500;
      }
      next(err)
   }
};

exports.deleteOutput = async (req, res, next) => {
   try {
      await Output.findByIdAndDelete(req.params.id);
      res.status(200).json({
         data: []
      });
   } catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
      }
      next(err);
   }
}

exports.deleteOutputs = async (req, res, next) => {
   const filter = JSON.parse(req.query.filter);
   await Output.deleteMany({_id: filter.id});
   res.status(200).json({
   data: []
   });
}