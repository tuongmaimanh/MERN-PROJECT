import mongoose from "mongoose";
const Schema = mongoose.Schema
const ReserveSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    email: {
      type: String,
      required: true,
    },
    selectedRooms: {
      type: [],
      required: true,
    },
    hotel: {
      type: String,
      required:true,
    },
    checkIn:{
      type:Date,
      required:true,
    },
    checkOut:{
      type:Date,
      required:true
    },
    totalPrice: {
      type: Number,
      required:true,
    },
  },
  { timestamps: true }
);


export default mongoose.model("Reserve", ReserveSchema);