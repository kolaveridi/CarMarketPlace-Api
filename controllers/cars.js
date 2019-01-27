

const User=require('../models/user');
const Car=require('../models/car');
const Joi =require('joi');
module.exports={

    index:async(req,res,next)=>{
        try{
       //Get all the cars
         const cars=await Car.find({});
         res.status(200).json(cars);
        }
        catch(err){
            next(err);
        }
     },
     newCar:async (req,res,next)=>{
         try{
          //Find the actual seller
         const seller= await User.findById(req.body.seller);


         //Create a new car
         const newCar=req.body;
         delete newCar.seller;
         // newcar will not contain seller id
         const car =new Car(newCar);
         car.seller=seller;//not car has seller as an object and not an array so not pushing

         await car.save();

         //Add newly created car to the acutal seller of car
         seller.cars.push(car);// look seller is the user and in his model we have an array cars and we are just puhsing to it 
         await seller.save();
         res.status(200).json(car);
         }
         catch(err){
             next(err);
         }
         
     }
};