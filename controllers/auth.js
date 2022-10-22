import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const register = (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hash,
  });

  newUser.save().then((r) => {
    res.status(200).json(r);
  });
};

export const login = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      //compare password
      bcrypt
        .compare(req.body.password, user.password)
        .then((match) => {
          if(!match){
            return res.send("wrong pass");
          }
          //crete token_access
          const token = jwt.sign({
            id: user._id, isAdmin: user.isAdmin
          }, "secret-key")
    const { password, isAdmin, ...otherDetails } = user._doc;

          //store cookies in browser
          res.cookie("access_token",token,{httpOnly: true}).status(200).json({ details: { ...otherDetails }, isAdmin });
        })
        .catch((err) => {
          res.send("wrong pass");
        });
    })
    .catch((err) => {
      res.send("wrong username");
    });
};

// export const login = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     if (!user) return next(createError(404, "User not found!"));

//     const isPasswordCorrect = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!isPasswordCorrect)
//       return next(createError(400, "Wrong password or username!"));

//     const token = jwt.sign(
//       { id: user._id, isAdmin: user.isAdmin },
//       "secret-key"
//     );

//     const { password, isAdmin, ...otherDetails } = user._doc;
//     res
//       .cookie("access_token", token, {
//         httpOnly: true,
//       })
//       .status(200)
//       .json({ details: { ...otherDetails }, isAdmin });
//   } catch (err) {
//     next(err);
//   }
// };