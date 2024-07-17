const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  trainId: {
    type: String,
    ref: "Train",
  },
  seatsBooked: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
});

const BookingModel = mongoose.model("Booking", BookingSchema);

module.exports = {
  BookingModel,
};
