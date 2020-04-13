const Input = require('../01models/input');
const Porduct = require('../01models/product');

exports.getInputs = async (req, res, next) => {
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
         if(key === 'date'){ 
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
      const [totalItems, inputs] = await Promise.all([
         Input.find(config).countDocuments(),
         Input.find(config).skip(skip).limit(limit).sort(sort)
      ])
      res.status(200).json({
         data: inputs.map(p => ({
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

exports.createInput = async (req, res, next) => {
   try {
      const input = new Input({...req.body});
      const [inpByDate, products] = await Promise.all([
         Input.findOne({
            date: req.body.date
         }),
         Porduct.find({
            _id: req.body.products.map(p => p.productId)
         })
      ]);

      let createdInput
      if(inpByDate) {
         let notSameProds = [...req.body.products];
         
         inpByDate.products.forEach(inpP => {
            const sameProd = req.body.products.find((bodyP, i) => {
               if(bodyP.productId.toString() === inpP.productId.toString()) {
                  notSameProds.splice(i, 1);
                  return true
               }
               return false
            });
            if(sameProd) {
               return inpP.amount += +sameProd.amount
            }
         });
         inpByDate.products = [
            ...inpByDate.products, 
            ...notSameProds.map(p => ({...p, amount: +p.amount}))];
         createdInput = await inpByDate.save();
      } else {
         createdInput = await input.save();
      }

      if(!products) { return res.status(400).json({error: "Tovar mavjud emas!"}) }
      products.forEach((p, i) => {
         p.amount += +req.body.products[i].amount;
         p.save();
      });

      res.status(201).json({
         data: {
            ...createdInput._doc, 
            id: createdInput._id.toString()
         }
      });
   } catch (err) {
      if(!err.statusCode) {
         err.statusCode = 500;
      }
      next(err)
   }
};

exports.editInput = async (req, res, next) => {
   try {
      const [input, products] = await Promise.all([
         Input.findById(req.params.id),
         Porduct.find({_id: req.body.products.map(p => p.productId)})
      ]);
      if(!products) { return res.status(400).json({error: "Tovar mavjud emas!"}) } 

      const updatedProds = products.map((p, i) => {
         p.amount = p.amount - input.products[i].amount + req.body.products[i].amount;
         return p.save();
      })

      for(let key in req.body) {
         input[key] = req.body[key];
      }
      const [updatedInput] = await Promise.all([
         input.save(),
         ...updatedProds
      ]);
      res.status(201).json({
         ...updatedInput._doc, 
         id: updatedInput._id.toString()
      });
   } catch (err) {
      if(!err.statusCode) {
         err.statusCode = 500;
      }
      next(err)
   }
};

exports.getInput = async (req, res, next) => {
   try {
      const input = await Input.findById(req.params.id);
      if(!input) {
         const err = new Error('Tovar topilmadi!');
         err.statusCode = 404;
         throw err;
      }
      res.status(200).json({
         data: {
            ...input._doc, 
            id: input._id.toString()
         }
      })
   } catch (err) {
      if(!err.statusCode) {
         err.statusCode = 500;
      }
      next(err)
   }
};

exports.deleteInput = async (req, res, next) => {
   try {
      await Input.findByIdAndDelete(req.params.id);
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

exports.deleteInputs = async (req, res, next) => {
   const filter = JSON.parse(req.query.filter);
   await Input.deleteMany({_id: filter.id});
   res.status(200).json({
      data: []
   });
}