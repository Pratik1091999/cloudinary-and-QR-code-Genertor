const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    profileId:{
         type:Number,
         require:true,
         unique:true
    },
    emailId:{
        type:String,
        require:true,
        unique:true
   },
   password:{
    type:String,
    require:true
},
fName:{
        type:String,
        require:true,
       trim:true
   }, 
lName:{
    type:String,
    require:true,
    trim:true
},
Img_Path:{
    type:String,
}
});

const userInfo = mongoose.model("User",userSchema);

module.exports = userInfo;