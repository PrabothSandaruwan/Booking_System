const router = require("express").Router();
const path = require("path");
let { Hotel, HotelImg, HotelRating } = require("../models/hotel");
const getHotel = require("../middleware/routingmw");

//Get all hotels

router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find().populate("user");
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get a single hotel by ID

router.get("/:id", getHotel, (req, res) => {
  res.json(res.hotel);
});

//Create a new hotel

router.post("/add/", async (req, res) => {
  const hotel = new Hotel({
    name: req.body.name,
    user: req.body.user,
    location: req.body.location,
    hotline: req.body.hotline,
    type: req.body.type,
  });

  try {
    const newHotel = await hotel.save();
    res.status(201).json(newHotel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Update a hotel by ID

router.patch("/:id", getHotel, async (req, res) => {
  if (req.body.name != null) {
    res.hotel.name = req.body.name;
  }
  if (req.body.location != null) {
    res.hotel.location = req.body.location;
  }
  if (req.body.hotline != null) {
    res.hotel.hotline = req.body.hotline;
  }
  if (req.body.type != null) {
    res.hotel.type = req.body.type;
  }

  try {
    const updatedHotel = await res.hotel.save();
    res.json(updatedHotel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete a hotel by ID

router.delete("/:id", getHotel, async (req, res) => {
  try {
    await res.hotel.remove();
    res.json({ message: "Hotel deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
