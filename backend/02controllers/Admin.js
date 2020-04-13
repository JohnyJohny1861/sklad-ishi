const Admin = require('../01models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
   const username = req.body.username;
   try {
      const password = await bcrypt.hash(req.body.password, 12);
      const admin = new Admin({
         username,
         password
      })

      const createdAdmin = await admin.save()

      res.status(200).json({
         data: {
            ...createdAdmin._doc,
            password: null,
            id: createdAdmin._id
         }
      })
   } catch (err) {
      if(!err.statusCode) {
         err.statusCode = 500;
      }
      next(err)
   }
}

exports.login = async (req, res, next) => {
   const username = req.body.username;
   const password = req.body.password;
   try {
      const admin = await Admin.findOne({username});
      if(!admin) { return res.status(226).json({ error: 'Username Xato!'}) }

      const isEqual = await bcrypt.compare(password, admin.password);
      if(!isEqual) { return res.status(226).json({ error: 'Parol Xato!'}) };
      
      const token = jwt.sign(
         {
            admin: admin._doc
         }, 
         'adminSecret'
      );
      res.status(200).json({
         token, 
         admin: {
            ...admin._doc,
            password: null
         }
      })
   } catch (err) {
      if(!err.statusCode) {
         err.statusCode = 500;
      }
      next(err)
   }
}

exports.editAdmin = async (req, res, next) => {
   const id = req.params.id;
   try {
      const admin = await Admin.findById(id);
      if (!admin) { res.status(226).json({ error: 'Admin mavjud emas'}) }

      if(req.body.newPassword) {
         const hashedP = await bcrypt.hash(req.body.newPassword, 12);
         admin.password = hashedP;
      }
      admin.username = req.body.username;

      const updatedAdmin = await admin.save();
      res.status(201).json({
         data: {
            ...updatedAdmin._doc, 
            password: null,
            id: updatedAdmin._id.toString()
         }
      });
   } catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
      }
      next(err);
   }
};

exports.getAdmins = async (req, res, next) => {
   // LIMIT
   let range;
   let skip = 0;
   let limit = 0;
   if(req.query.range) {
      range =  JSON.parse(req.query.range);
      skip = range[0] || 0;
      limit = range[1] - skip + 1;
   }

   try {
      const [totalItems, admins] = await Promise.all([
         Admin.find().countDocuments(),
         Admin.find().skip(skip).limit(limit)
      ]);
      res.status(200).json({
         data: admins.map(admin => ({
               id: admin._id.toString(),
               password: null,
               ...admin._doc
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

exports.getAdmin = async (req, res, next) => {
   const id = req.params.id;
   try {
      const admin = await Admin.findById(id);
      if(!admin) { res.status(226).json({ error: 'Admin Mavjud Emas!'}) }
      res.status(200).json({
         data: {
               ...admin._doc,
               password: null,
               id: admin._id
         }
      })
   } catch (err) {
      if(!err.statusCode) {
         err.statusCode = 500;
      }
      next(err)
   }
}
