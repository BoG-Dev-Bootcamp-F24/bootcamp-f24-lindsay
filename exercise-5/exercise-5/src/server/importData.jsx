const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const mongoURI = "mongodb+srv://lindsayhwang:mongoPW123@clusterbog.6nowq.mongodb.net/MARTA?retryWrites=true&w=majority&appName=ClusterBoG";

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

const readJSONFile = (filePath) => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const processStationData = (data) => {
  const stations = [];
  for (const [line, names] of Object.entries(data)) {
    names.forEach(name => {
      stations.push({ name, line });
    });
  }
  return stations;
};

const processTrainData = (data) => {
    const trains = [];
    data.forEach(train => {
      trains.push({
        destination: train.DESTINATION,
        direction: train.DIRECTION,
        eventTime: train.EVENT_TIME, 
        headSign: train.HEAD_SIGN,
        line: train.LINE,
        nextArrival: train.NEXT_ARR, 
        station: train.STATION,
        trainId: train.TRAIN_ID,
        waitingSeconds: train.WAITING_SECONDS, 
        waitingTime: train.WAITING_TIME,
        responseTimestamp: train.RESPONSETIMESTAMP, 
        vehicleLongitude: train.VEHICLELONGITUDE,
        vehicleLatitude: train.VEHICLELATITUDE,
        delay: train.DELAY,
        tripId: train.TRIP_ID,
      });
    });
  
    return trains;
  };
  
  const importData = async () => {
    try {
      await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      const trainData = readJSONFile(path.join(__dirname, "trainData.json"));
      const trains = trainData.RailArrivals; 
      const processedTrains = processTrainData(trains); 
      const stationData = readJSONFile(path.join(__dirname, "stationData.json"));
      const processedStations = processStationData(stationData);
      await Train.insertMany(processedTrains); 
      await Station.insertMany(processedStations);
    } catch (error) {
    } finally {
      await mongoose.connection.close();
    }
  };
  

importData();
