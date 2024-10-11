const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://lindsayhwang:mongoPW123@clusterbog.6nowq.mongodb.net/MARTA?retryWrites=true&w=majority&appName=ClusterBoG", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const trainSchema = new mongoose.Schema({
  destination: String,
  direction: String,
  eventTime: Date,
  headSign: String,
  line: String,
  nextArrival: Date,
  station: String,
  trainId: String,
  waitingSeconds: Number,
  waitingTime: String,
  responseTimestamp: Date,
  vehicleLongitude: String,
  vehicleLatitude: String,
  delay: String,
  tripId: String,
});

const stationSchema = new mongoose.Schema({
  name: String,
  line: String,
});

const Train = mongoose.model("Train", trainSchema);
const Station = mongoose.model("Station", stationSchema);

app.get("/api/trains", async (req, res) => {
    const trains = await Train.find();
    res.json(trains);
  });

app.get("/api/stations", async (req, res) => {
    const stations = await Station.find();
    res.json(stations);
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
