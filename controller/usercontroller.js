const userInfo = require("../models/user");
const jwt = require('jsonwebtoken');
// const ejs = require('ejs');
// const path =  require("path");
require('dotenv').config();
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2

// cloudinary config
cloudinary.config({
    cloud_name: 'das1ctdt6',
    api_key: '171695239728683',
    api_secret: 'lh1vRu60bRaTYc91QYaRxeNueYo'
});



//   const Img_Upload = async (req,res) =>{
//    console.log(req.body);
//    const file = req.files.photo;
//    cloudinary.uploader.upload(file.tempFilePath,(error,result)=>{
//     console.log(result);
//    })

// }

const signup = async (req, res) => {
    const {
        _profileId, _emailId, _password, _fName, _lName } = req.body;
    // console.log(_password)
    try {
        const file = req.files.photo;
        cloudinary.uploader.upload(file.tempFilePath, async(error, result) => {
            console.log(result);

            let salt = await bcrypt.genSalt(10);
            let hashPassword = await bcrypt.hash(_password, salt)


            const addingUsersRecord = new userInfo({
                profileId: _profileId,
                emailId: _emailId,
                password: hashPassword,
                fName: _fName,
                lName: _lName,
                Img_Path: result.url
            });

            const insertUser = await addingUsersRecord.save();
            console.log("User add sucessfully" + insertUser);
            res.send("User add sucessfully" + insertUser);
        })
    } catch (err) {
        res.send(err);
        console.log(err)
    }

}


const login = async (req, res) => {

    const { _password, _email } = req.body;
    if (_email && _password) {
        // console.log("Email - "+_email +"Password -"+_password)
        let user = await userInfo.findOne({ emailId: _email });
        //  console.log(user)
        if (user) {
            let check = await bcrypt.compare(_password, user.password);
            console.log(check)
            if (check) {
                let token = jwt.sign({ userID: user._id }, process.env.Secret, { expiresIn: '15m' });
                res.json({ "message": "Login Succesfully", "Token valid for 15 Min": token })
            } else {
                res.send("Enter valid Email ID And Password")
            }
        } else {
            res.send("User Not Exist on DataBase")
        }

    } else {
        res.send("Please Enter Email ID and Password!")
    }



}

const getData = async (req, res) => {
    let result = userInfo.find();
    res.send('verfiy by middleware')
}


module.exports = { signup, login, getData};