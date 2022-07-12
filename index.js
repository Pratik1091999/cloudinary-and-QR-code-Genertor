const express = require("express");
const fileUpload = require('express-fileupload');  
const userInfo = require("./models/user");
require('./db/connection');
require('./models/user');
const ejs = require('ejs');
const path =  require("path");
const qrcode = require('qrcode');
const { nextTick } = require("process");
// const userRoute = require('../REST API/router/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'view'));

app.get("/" ,(req,res,next)=>{
res.render("index");
})

app.post('/scan',(req,res,next)=>{
const input_text = req.body.text;
qrcode.toDataURL(input_text,(err,src)=>{
    res.render("scan",{
        qr_code:src,
    });
})
})
// cloudinary
app.use(fileUpload({
    useTempFiles:true
}));


//routes url

app.use('/user', require('./router/routes'));

const port = process.env.PORT || 4000;

app.get("/homepage",(req,res)=>{
    res.send("HOME PAGE");
});


app.listen(port,()=>{
    console.log(` Port run at localhost ${port}`);
});
