import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = (req, res, next) => {
  const newHotel = new Hotel(req.body);
  newHotel.save().then((result) => {
    res.status(200).json(result);
  });
};

export const updateHotel = (req, res, next) => {
  Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((r) => {
      res.status(200).json(r);
    })
    .catch((err) => {
      next(err);
    });
};

export const deleteHotel = (req, res, next) => {
  Hotel.deleteOne({ _id: req.params.id }).then((r) => {
    res.status(200).json("Hotel has been deleted.");
  });
};

export const getAllHotel = (req, res, next) => {
  const { min, max, ...other } = req.query;
  console.log(req.query.limit);
  Hotel.find({ ...other, cheapestPrice: { $gt: min || 1, $lt: max || 9999 } })
    .limit(req.query.limit)
    .then((r) => {
      res.status(200).json(r);
    });
};
export const getHotel = (req, res, next) => {
  Hotel.findById(req.params.id).then((r) => {
    console.log(r)
    res.status(200).json(r);
  });
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  const list = await Promise.all(
    cities.map((city) => {
      return Hotel.countDocuments({ city: city });
    })
  );
  res.status(200).json(list);
};

export const countByType = async (req, res, next) => {
  const hotelCount = await Hotel.countDocuments({ type: "hotel" });
  const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
  const resortCount = await Hotel.countDocuments({ type: "resort" });
  const villaCount = await Hotel.countDocuments({ type: "villa" });
  const cabinCount = await Hotel.countDocuments({ type: "cabin" });

  res.status(200).json([
    { type: "hotel", count: hotelCount },
    { type: "apartment", count: apartmentCount },
    { type: "resort", count: resortCount },
    { type: "villa", count: villaCount },
  ]);
};

export const getHotelRoom = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const getByType = async (req,res,next) => {
  const type = req.params.type
  const result = await Hotel.find({ type: type });
  

  res.status(200).json(result);
}


