const Joi =require('joi');
module.exports={
    validateParams:(schema,name)=>{
        return (req,res,next) =>{
            const result=Joi.validate({param:req['params'][name]},schema);
            if(result.error){
                //
                return res.status(400).json(result.error);
            }else{
                if(!req.value){
                    req.value=[];
                }
                if(!req.value['params']){
                    req.value['params']={};
                }
                req.value['params'][name]=result.value.param;

                next();
            }
        }
    },
    schemas:{
        idSchema:Joi.object().keys({
             param:Joi.string().regex(/^[a-f\d]{24}$/i)
            .required()
        })
    }
}
