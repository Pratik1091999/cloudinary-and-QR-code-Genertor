const jwt = require('jsonwebtoken');
require('dotenv').config();


const checkAuth = async (req,res,next) =>{
   try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.Secret)
    req.user = user._id;
    
    
    next();
   } catch (error) {  
     res.status(401).json({"message":"UnAuthorized User"})
     throw error;
   }
}


const AdminAuth = async (req,res,next) =>{
  try {
 
   
   
   next();
  } catch (error) {  
    res.status(401).json({"message":"No Access "})
    throw error;
  }
}
module.exports = {
    checkAuth,AdminAuth
}

