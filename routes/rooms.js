import express from "express";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRoom,
  updateRoomAvailable
} from "../controllers/room.js";
import { verifyAdmin } from "../Util/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:hotelId", verifyAdmin, createRoom);
//UPDATE
router.put("/:roomId", verifyAdmin, updateRoom);
//DELETE ROOM IN HOTEL TABLE
router.delete("/:hotelId/:roomId", verifyAdmin, deleteRoom);
//GET
router.get("/:roomId", getRoom);
//GET ALL
router.get("/", getAllRoom);

router.put("/available/:roomNumberId", updateRoomAvailable);


export default router;
