const mongoose = require("mongoose");
const schema = mongoose.Schema;
const model = mongoose.model;

const hotelImgSchema = new schema({
  img: {
    type: String,
    required: true,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  priorityNum: {
    type: Number,
    required: true,
  },
});

const hotelRatingSchema = new schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const hotelSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //users need to be created in mongo using firebase
      required: false, //false just for testing
    },
    location: {
      type: String,
      required: true,
    },
    hotline: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    hotelImg: [hotelImgSchema],
    hotelRate: [hotelRatingSchema],
  },
  {
    timestamps: true,
  }
);

const Hotel = model("Hotel", hotelSchema);
const HotelImg = model("HotelImg", hotelImgSchema);
const HotelRating = model("HotelRating", hotelRatingSchema);

module.exports = { Hotel, HotelImg, HotelRating };
