const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
    },
    seatsAvailable: {
      type: Number,
      required: true,
    },
    amenities: {
      type: [String],
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
  },
  { collection: "Room" }
);

const RoomDetails = mongoose.model("Room", RoomSchema);

module.exports = RoomDetails;
