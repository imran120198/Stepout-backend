const mongoose = require("mongoose");

const TrainSchema = mongoose.Schema(
  {
    trainId: { type: String, unique: true },
    name: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    totalSeats: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
  },
  { timestamps: true }
);

const TrainModel = mongoose.model("Train", TrainSchema);

module.exports = {
  TrainModel,
};
