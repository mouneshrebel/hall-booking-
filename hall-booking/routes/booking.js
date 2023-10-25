var express = require("express");
var router = express.Router();
const Booking = require("../models/BookingDetails");
const Room = require("../models/RoomDetails");

router.post("/create", async (req, res) => {
  try {
    const { customerName, date, startTime, endTime, roomId } = req.body;
    const existingBooking = await Booking.find({
      roomId,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
        { startTime: { $gte: startTime, $lte: endTime } },
        { endTime: { $gte: startTime, $lte: endTime } },
      ],
    });
    if (existingBooking.length > 0) {
      res.status(400).json("Room not available");
    } else {
      const room = await Room.findOne({_id: roomId });
      const durationInMilliseconds =  new Date(endTime) - new Date(startTime) ;
      const durationInHours = Math.ceil(durationInMilliseconds / 3600000);
      const price = durationInHours * room.pricePerHour;
      const newBooking = new Booking({
        customerName,
        startTime,
        endTime,
        roomId,
        price
      });
      await newBooking.save();
      res.status(201).json(newBooking);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to book a room." });
  }
});

module.exports = router;
