const express = require("express");
const cors = require("cors");
const { connection } = require("./Connection/Connection");
const { UserRouter } = require("./Routes/User.route");
const { TrainRouter } = require("./Routes/Train.route");
const { BookingRoute } = require("./Routes/Booking.route");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Railway Management Server");
});

app.use("/user", UserRouter);
app.use("/train", TrainRouter);
app.use("/booking", BookingRoute);

app.listen(process.env.PORT || 8080, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
  }
  console.log(`Running on PORT ${process.env.PORT}`);
});
