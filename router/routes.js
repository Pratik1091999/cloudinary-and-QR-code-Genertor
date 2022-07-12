const express = require('express');
const router = express.Router();
const userController = require("../controller/usercontroller");
const Auth = require("../Middlware/middleware");

// router.post('/img',userController.Img_Upload);
router.post('/signup',userController.signup);
router.post('/login',userController.login);
router.get('/verfiy', Auth.checkAuth, userController.getData );



module.exports = router;
