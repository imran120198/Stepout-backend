const { Router } = require("express");
const { authentication } = require("../Middleware/authentication");
const { TrainModel } = require("../Model/Train.model");
const { BookingModel } = require("../Model/Booking.model");

const BookingRoute = Router();

BookingRoute.post("/", authentication, async (req, res) => {
  try {
    const { trainId, seats } = req.body;
    const train = await TrainModel.find({ trainId });

    if (!train) {
      return res.status(404).send({ error: "Train not found" });
    }

    if (train.availableSeats < seats) {
      return res.status(400).send({ error: "Not enough seats available" });
    }

    const updatedTrain = await TrainModel.findOneAndUpdate(
      { trainId: trainId, availableSeats: { $gte: seats } },
      { $inc: { availableSeats: -seats } },
      { new: true }
    );

    if (!updatedTrain) {
      return res.status(400).send({
        error: "Not enough seats available or train not found",
      });
    }

    console.log(req.user.userId);
    const newBooking = new BookingModel({
      userId: req.user.userId,
      trainId,
      seatsBooked: seats,
    });
    await newBooking.save();

    res.status(200).send({ message: "Booking successful!" });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

BookingRoute.get("/:id", authentication, async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await BookingModel.findById({ _id: id });
    res.send(booking);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = {
  BookingRoute,
};
