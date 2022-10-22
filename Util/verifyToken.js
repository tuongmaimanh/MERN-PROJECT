import jwt from "jsonwebtoken";
import {createError} from '../Util/error.js'

export const verifyToken = (req, res, next) => {
  const token = req.cookies["access_token"]
  console.log('token',token)
  //check token exit?
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  //next check token match?
  jwt.verify(token, "secret-key", (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;//set user in req.user

    console.log('ủe',req.user);
    next();
  });
};


export const verifyUser = (req, res, next) => {
  console.log('req.user.id',req.user)
  console.log('req.params.id',req.params.id)
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(new Error("You are not authorized!"));
    }
  });
};
export const verifyAdmin = (req, res, next) => {
  verifyToken(req,res,() => {
    console.log(req.user.id)
        if(req.user.isAdmin){
            next()
        }else{
            return next(new Error("You are not authorized!"));
        }
  })

  

  
//   verifyToken(req, res, next);
  
//   if (req.user.isAdmin) {
//     next();
//   } else {
//     return next(new Error(403,"You are not authorized!"));
//   }
};
