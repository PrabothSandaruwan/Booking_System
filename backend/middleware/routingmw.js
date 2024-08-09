const { Hotel } = require("../models/hotel");

// Middleware function to fetch a single hotel by ID
const getHotel = async (req, res, next) => {
  let hotel;
  try {
    hotel = await Hotel.findById(req.params.id).populate("user");
    if (hotel == null) {
      return res.status(404).json({ message: "Hotel not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.hotel = hotel;
  next();
};

module.exports = getHotel;
