const express = require('express');
const {adminTokenVerify} = require('../middleware/auth')

const bcrypt = require('bcrypt');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');

adminRouter.post('/signIn',adminController.loginPost)
adminRouter.get('/getUsers',adminTokenVerify,adminController.getUsers )
adminRouter.get('/editUser/:id',adminTokenVerify,adminController.adminEditUser);
adminRouter.post('/editUser/:id',adminController.adminEditUserPost);
adminRouter.delete('/deleteUser/:id',adminTokenVerify,adminController.adminDeleteUser);

module.exports = adminRouter;