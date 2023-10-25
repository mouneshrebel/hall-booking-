var express = require("express");
var router = express.Router();
const Room = require("../models/RoomDetails");
const Booking = require("../models/BookingDetails");

router.post("/create", async (req, res) => {
  try {
    const { roomNumber, seatsAvailable, amenities, pricePerHour } = req.body;
    const newRoom = new Room({
      roomNumber,
      seatsAvailable,
      amenities,
      pricePerHour,
    });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ message: "Failed to create room." });
  }
});

router.get("/rooms-booked", async (req, res) => {
  try {
    const rooms = await Room.find();
    const bookings = await Booking.find();

    const result = rooms.map((room) => {
      const booking = bookings.find(
        (booking) => booking.roomId === room._id.toString()
      );
      return {
        roomName: room.roomNumber,
        bookedStatus: booking ? "Booked" : "Available",
        customerName: booking ? booking.customerName : "",
        date: booking ? booking.date : "",
        startTime: booking ? booking.startTime : "",
        endTime: booking ? booking.endTime : "",
      };
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch room bookings." });
  }
});

module.exports = router;
