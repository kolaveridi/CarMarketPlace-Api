const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const {validateParams,schemas,validateBody}=require('../helpers/routehelpers.js');
const UsersController=require('../controllers/users');


router.route('/')
.get(UsersController.index)
.post(validateBody(schemas.userSchema),UsersController.newUser)


router.route('/:userId')
.get(validateParams(schemas.idSchema,'userId'),UsersController.getUser)
.put(UsersController.replaceUser)
.patch(UsersController.updateUser)

router.route('/:userId/cars')
.get(UsersController.getUserCars)
.post(UsersController.newUserCar)


module.exports=router;
