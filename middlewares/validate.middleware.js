import ErrorHandler from "../utils/error.handler.js";

export const validate = function(schema){
    return (req,res,next)=>{
        const validationResult = schema.safeParse(req.body);
        if(!validationResult.success){
            const message = validationResult.error.errors[0].message;
            return next(new ErrorHandler(400,{message:message}));
        }

        req.body = validationResult.data;
        next();
    }
}