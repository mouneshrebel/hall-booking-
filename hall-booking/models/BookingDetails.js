const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    roomId: {
        type: String,
        required: true,
    },
    price: {
      type: String,
      required: true,
  },
  },
  { collection: "Booking" }
);

const BookingDetails = mongoose.model("Booking", BookingSchema);

module.exports = BookingDetails;
