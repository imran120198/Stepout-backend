const { Router } = require("express");
const { authentication } = require("../Middleware/authentication");
const { TrainModel } = require("../Model/Train.model");
const { BookingModel } = require("../Model/Booking.model");

const BookingRoute = Router();

BookingRoute.post("/", authentication, async (req, res) => {
  try {
    const { trainId, seats } = req.body;
    const train = await TrainModel.findById(trainId);

    if (!train) {
      return res.send({ error: "Train not found" });
    }

    if (train.availableSeats < seats) {
      return res.send({ error: "Not enough seats available" });
    }

    const updatedTrain = await TrainModel.findOneAndUpdate(
      { trainId: trainId, availableSeats: { $gte: seats } },
      { $inc: { availableSeats: -seats } },
      { new: true }
    );

    if (!updatedTrain) {
      return res.send({
        error: "Not enough seats available or train not found",
      });
    }

    const booking = new BookingModel({
      userId: req.user._id,
      trainId,
      seatsBooked: seats,
    });

    await booking.save();
    res.status(201).send(booking);
  } catch (err) {
    res.status(400).send(err);
  }
});

BookingRoute.get(":id", authentication, async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await BookingModel.findById(id)
      .populate("userId")
      .populate("trainId");
    if (!booking || booking.userId._id.toString() !== req.user._id.toString()) {
      throw new Error("Booking not found");
    }
    res.send(booking);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = {
  BookingRoute,
};
