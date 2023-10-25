var express = require("express");
var router = express.Router();
const Room = require("../models/RoomDetails");
const Booking = require("../models/BookingDetails");

router.get('/all-customer-booked-history', async (req, res) => {
    try {
      const bookings = await Booking.find().populate('roomId', 'roomNumber');
      console.log(bookings)
      const result = bookings.map((booking) => ({
        customerName: booking.customerName,
        startTime: booking.startTime,
        endTime: booking.endTime,
        roomId: booking.roomId,
        totalPrice:booking.price,
      }));
  
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch customer bookings.' });
    }
  });

  router.get('/customer-booked-history/:customerName', async (req, res) => {
    try {
      const customerName = req.params.customerName;
      const bookings = await Booking.find({ customerName });
      res.status(200).json(bookings);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch customer booking.' });
    }
  });

module.exports = router;
