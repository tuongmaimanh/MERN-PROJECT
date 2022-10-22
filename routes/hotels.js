import express from 'express'
import {createHotel, updateHotel, deleteHotel, getHotel, getAllHotel, countByCity, countByType, getHotelRoom, getByType} from "../controllers/hotel.js"
import { verifyAdmin } from '../Util/verifyToken.js';

const router = express.Router()

//CREATE
router.post("/",verifyAdmin,createHotel)
//UPDATE
router.put("/:id",verifyAdmin, updateHotel);
//DELETE
router.delete("/:id",verifyAdmin,deleteHotel)
//GET
router.get("/find/:id",getHotel)

//GET ALL
router.get("/", getAllHotel)


router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/getByType/:type", getByType);

//GET HOTEL ROOMS
router.get("/room/:id", getHotelRoom)


export default router