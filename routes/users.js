import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
  postReserve,
  postCheckoutSuccsess
} from "../controllers/user.js";
import { verifyUser, verifyAdmin } from "../Util/verifyToken.js";

const router = express.Router();
router.get("/checkAuth", verifyUser, (req, res, next) => {
  res.send("auth o");
});
//CREATE
router.post("/", verifyUser, createUser);
//UPDATE
router.put("/:id", verifyUser, updateUser);
//DELETE
router.delete("/:id", verifyUser, deleteUser);
//GET
router.get("/:id", verifyUser, getUser);
//GET
router.post("/reserve/:id", postReserve);
//GET ALL
router.get("/", verifyAdmin, getAllUser);

//SEND MAIL
router.post("/checkoutSuccess",postCheckoutSuccsess)

export default router;
