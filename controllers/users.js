

const User=require('../models/user');

module.exports ={


    // index:(req,res,next)=>{
    //     User.find({})
    //     .then (users=>{
    //        res.status(200).json(users);
    //     })
    //     .catch(err=>{
    //         next(err);
    //     });
    // },

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
        try{
            const newUser=new User(req.body);
            const user= await newUser.save();
            res.status(201).json(user);
        }catch(err){
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
