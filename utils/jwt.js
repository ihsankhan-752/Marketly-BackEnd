import jwt from "jsonwebtoken";

export const generateToken = function(payload){
    return jwt.sign(payload,process.env.JWT_SECRET);
}


export const verifyToken = function(token){
    return jwt.verify(token,process.env.JWT_SECRET);
}