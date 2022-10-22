import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createRoom = (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  newRoom
    .save()
    .then((newRoom) => {
      Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: newRoom._id },
      })
        .then((r) => {
          res.status(200).json(newRoom);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

export const updateRoom = (req, res, next) => {
  Room.findByIdAndUpdate(req.params.roomId, { $set: req.body }, { new: true })
    .then((r) => {
      res.status(200).json(r);
    })
    .catch((err) => {
      next(err);
    });
};

export const deleteRoom = (req, res, next) => {
  const hotelId = req.params.hotelId;
  const roomId = req.params.roomId;

  Hotel.findByIdAndUpdate(hotelId, {
    $pull: { rooms: roomId },
  })
    .then((r) => {
      res.status(200).send("Room had deleted");
    })
    .catch((err) => console.log(err));
};

export const getRoom = (req, res, next) => {
  Room.findOne({ _id: req.params.roomId }).then((r) => {
    res.status(200).json(r);
  });
};
export const getAllRoom = (req, res, next) => {
  Room.find().then((r) => {
    res.status(200).json(r);
  });
};

export const updateRoomAvailable = (req, res, next) => {
  console.log("m",req.body.middleDate,req.params.roomNumberId)
  Room.findOneAndUpdate(
    { "roomNumbers._id": req.params.roomNumberId },
    {
      $push: {
        "roomNumbers.$.unavailableDates": req.body.middleDate,
      },
    }).then(r => res.send(r))
    
};
