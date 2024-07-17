const { Router } = require("express");
const { TrainModel } = require("../Model/Train.model");
const { authentication } = require("../Middleware/authentication");

const TrainRouter = Router();

// Add Train
TrainRouter.post("/", authentication, async (req, res) => {
  try {
    const { trainId, name, source, destination, totalSeats } = req.body;
    const train = new TrainModel({
      trainId,
      name,
      source,
      destination,
      totalSeats,
      availableSeats: totalSeats,
    });
    await train.save();
    res.status(201).send(train);
  } catch (error) {
    res.send(error);
  }
});

// Get train
TrainRouter.get("/", async (req, res) => {
  try {
    const { source, destination } = req.query;
    const getTrainData = await TrainModel.find({ source, destination });
    res.send(getTrainData);
  } catch (error) {
    res.send(error);
  }
});

module.exports = {
  TrainRouter,
};
