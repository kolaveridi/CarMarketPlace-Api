const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const {validateParams,schemas,validateBody}=require('../helpers/routehelpers.js');
const carsController=require('../controllers/cars');


router.route('/')
 .get(carsController.index)
 .post(carsController.newCar)
 

 module.exports=router;
