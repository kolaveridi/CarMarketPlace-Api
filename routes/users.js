const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

const UsersController=require('../controllers/users');


router.route('/')
.get(UsersController.index)
.post(UsersController.newUser)


module.exports=router;
