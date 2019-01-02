const express=require('express');
const logger=require('morgan');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
//const path=require('path');
mongoose.Promise=global.Promise;

const app=express();
app.use(logger('combined'));



//routes
const users=require('./routes/users');


//Middlewares
app.use(bodyParser.json());


//Routes
app.use('/users',users);



//Catch 404 error handler functions and forward them to error handler
app.use((req,res,next)=>{
    const error =new Error('Not found');
    error.status=404;
    next(err)
});

app.use((err,req,res,next)=>{
    //Responsd to client
    const error=app.get('env')==='development'?err:{};
    const status=err.status || 500;

    res.status(status).json({
        error:{
            message:error.message
        }
    });


    //Respond to ourselves
    console.error(err);

})
//db configuration
const db=require('./keys/key').mongoURI;
// connect to mongodb
mongoose
.connect(db)
.then(()=>console.log('MongoDb connected'))
.catch(err=>console.log(err));


//Start the server
const port =app.get('port') || 3000;
app.listen(port,()=>console.log('Server is litening on port ${port}'));
