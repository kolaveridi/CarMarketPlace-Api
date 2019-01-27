

const User=require('../models/user');
const Car=require('../models/car');
const Joi =require('joi');
const idSchema=Joi.object().keys({
    userId:Joi.string().regex(/^[a-f\d]{24}$/i)
    .required()
})
module.exports ={


    index:async(req,res,next)=>{
        try{
            const users =await User.find({});
            res.status(200).json(users);
        }
        catch(err){
            next(err);
        }

    },

    newUser:async(req,res,next)=>{
        console.log('req.value',req.value);
        try{
            const newUser=new User(req.value.body);
            const user= await newUser.save();
            res.status(201).json(user);
        }catch(err){
            next(err);
        }

    },
    getUser:async(req,res,next)=>{

        try{
            const {userId}=req.value.params;
            const user=await User.findById(userId);
            res.status(200).json(user);
        }
        catch(err){
            next(err);
        }
    },
    replaceUser:async(req,res,next)=>{
        // req.body must have all the fields

        try{
            const {userId}=req.params;
            const newUser=req.body;
            const result = await  User.findOneAndUpdate(userId,newUser)
            console.log(result);
            res.status(200).json(result);
        }
        catch(err){
            next(err);
        }
    },
    updateUser:async(req,res,next)=>{
        try{
            const {userId}=req.params;
            const newUser=req.body;
            const result = await  User.findOneAndUpdate(userId,newUser)
            console.log(result);
            res.status(200).json(result);
        }
        catch(err){
            next(err);
        }
    },
    getUserCars:async(req,res,next)=>{
        try{
           const {userId}=req.params;
           const user=await User.findById(userId).populate('cars');// to get things other than id
           res.status(200).json(user);

        }
        catch(err){
            next(err);
        }
    },
    newUserCar:async(req,res,next)=>{
        console.log('working');
        try{
            //Create a new Car
            const newCar=new Car(req.body);
            //Get the user
            const {userId}=req.params;
            const user=await User.findById(userId);
            console.lo
            //making the connection by assigning user as car's seller
            newCar.seller=user;
            //Save the car
            const car=await newCar.save();
            //Add car to the user selling car array
            user.cars.push(newCar);
            //Save the user
            const userSavedWithCar=user.save();

            res.status(201).json(newCar);
        }
        catch(err){
            next(err);
        }

    }
};

/*

WE can interact with mongoose in 3 different ways
1.callbacks
2.promises
3. aysnc await

*/
