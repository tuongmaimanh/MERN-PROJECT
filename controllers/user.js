import Reserve from "../models/Reserve.js";
import User from "../models/User.js";
import nodemailer from "nodemailer"
import sendGrid from "nodemailer-sendgrid-transport" 

//config mailer
const transporter = nodemailer.createTransport(sendGrid({
  auth:{
    api_key: "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"
  }
}))

export const createUser = (req, res, next) => {
  const newUser = new User(req.body);
  newUser.save().then((result) => {
    res.status(200).json(result);
  }).catch(err => console.log(err))
};

export const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((r) => {
      res.status(200).json(r);
    })
    .catch((err) => {
      next(err);
    });
};

export const deleteUser = (req, res,next ) => {
  User.deleteOne({_id: req.params.id})
  .then(r => {
    res.status(200).json("User has been deleted.");
  })
}

export const getUser = (req,res, next) => {
  User.findOne({_id: req.params.id})
  .then(r => {
    res.status(200).json(r);

  })
}

export const getAllUser = (req,res, next) => {
  User.find()
  .then(r => {
    res.status(200).json(r);

  })
}


export const postReserve = (req,res,next) => {
  const userId = req.params.id
  const data = req.body
  data.userId = userId
  console.log('req.body',data)
  
  const newReserve = new Reserve(data)
  newReserve.save().then(r => {
    res.status(200).json(r)
  }).catch(err=> console.log(err))
}

export const postCheckoutSuccsess = (req,res,next) => {
  const email = req.body.email
  transporter.sendMail({
    to:email,
    from:'maituong000@gmail.com',
    subject: 'Checkout Successful',
    html: '<h1>You successfully checkout!</h1>'
  })
}