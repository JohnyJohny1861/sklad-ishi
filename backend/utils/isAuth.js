const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
   const authHeader = req.get('Authorization');
   if(!authHeader) {
      return res.status(400).json({ error: "Not Authenticated"})
   }
   const token = authHeader;
   let userToken;
   try {
      userToken = jwt.verify(token, 'adminSecret');
   } catch (err) {
      err.statusCode = 500;
      throw err;
   }
   if(!userToken) {
      return res.status(400).json({ error: "Not Authenticated"})
   }
   if(userToken) {
      req.user = userToken.user;
   }
   next();
}