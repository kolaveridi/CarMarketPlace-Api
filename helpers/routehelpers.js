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
    validateBody:(schema)=>{
         return (req,res,next)=>{
             const result=Joi.validate(req.body,schema);
             if(result.error){
                 return res.status(400).json(result.error);
             }else{
                 if(!req.value){
                     req.value={};   
                 }
                 if(req.value['body']){
                     req.value['body']={};
                 }
                 req.value['body']=result.value;
                 next();
             }
         }
    },
    schemas:{
        userSchema:Joi.object().keys({
           firstName:Joi.string().required(),
           lastName:Joi.string().required(),
           email:Joi.string().email().required()
        }),
        idSchema:Joi.object().keys({
             param:Joi.string().regex(/^[a-f\d]{24}$/i)
            .required()
        })
    }
}
