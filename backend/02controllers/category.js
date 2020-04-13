const Category = require('../01models/category');

exports.getCategorys = async (req, res, next) => {
   let range;
   let skip = 0;
   let limit = 0;
   if(req.query.range) {
      range =  JSON.parse(req.query.range);
      skip = range[0] || 0;
      limit = range[1] - skip + 1;
   }

   try {
      const [totalItems, categorys] = await Promise.all([
         Category.find().countDocuments(),
         Category.find().skip(skip).limit(limit)
      ])
      res.status(200).json({
         data: categorys.map(p => ({
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

exports.createCategory = async (req, res, next) => {
   try {
      const category = new Category({...req.body});
      const createdCategory = await category.save();
      res.status(201).json({
         data: {
            ...createdCategory._doc, 
            id: createdCategory._id.toString()
         }
      });
   } catch (err) {
      if(!err.statusCode) {
         err.statusCode = 500;
      }
      next(err)
   }
};

exports.editCategory = async (req, res, next) => {
   try {
      const category = await Category.findById(req.params.id);
      for(let key in req.body) {
         category[key] = req.body[key];
      }
      const updatedCategory = await category.save();
      res.status(201).json({
         ...updatedCategory._doc, 
         id: updatedCategory._id.toString()
      });
   } catch (err) {
      if(!err.statusCode) {
         err.statusCode = 500;
      }
      next(err)
   }
};

exports.getCategory = async (req, res, next) => {
   try {
      const category = await Category.findById(req.params.id);
      if(!category) {
         const err = new Error('Tovar topilmadi!');
         err.statusCode = 404;
         throw err;
      }
      res.status(200).json({
         data: {
            ...category._doc, 
            id: category._id.toString()
         }
      })
   } catch (err) {
      if(!err.statusCode) {
         err.statusCode = 500;
      }
      next(err)
   }
};

exports.deleteCategory = async (req, res, next) => {
   try {
      await Category.findByIdAndDelete(req.params.id);
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

exports.deleteCategorys = async (req, res, next) => {
   const filter = JSON.parse(req.query.filter);
   await Category.deleteMany({_id: filter.id});
   res.status(200).json({
      data: []
   });
}