const express = require('express');
const User = require('../Models/UserSchema');
const bcrypt = require('bcrypt');
const userController = require('../controllers/userController');
const userRouter = express.Router();
const {userTokenVerify} = require('../middleware/auth')



userRouter.get('/profile',userTokenVerify,userController.fetchUser);
userRouter.get('/',userController.userSignIn);
userRouter.post('/sign-in',userController.userSignInPost);
userRouter.post('/sign-up',userController.userSignUpPost);
userRouter.post('/edit-userProfile',userTokenVerify,userController.editUserProfile);



module.exports = userRouter;