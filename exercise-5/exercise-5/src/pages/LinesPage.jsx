import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import TrainList from "../components/TrainList";
import "./LinesPage.css";

const fetchTrainData = async () => {
  const response = await axios.get("http://localhost:5000/api/trains");
  return response.data;
};

const fetchStationData = async () => {
  const response = await axios.get("http://localhost:5000/api/stations");
  return response.data;
};

const LinesPage = () => {
  const [currColor, setCurrColor] = useState("gold");
  const [stationData, setStationData] = useState([]);
  const [trainData, setTrainData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const stations = await fetchStationData();
      const trains = await fetchTrainData();
      setStationData(stations); 
      setTrainData(trains); 
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="title">GOLD</h1>
      <div className="linesPageContainer">
        <div className="navBar">
          <NavBar color={currColor} data={stationData} />
        </div>
        <div className="trainListContainer">
          <div className="trainButtons">
            <button>Arriving</button>
            <button>Scheduled</button>
            <button>Southbound</button>
            <button>Westbound</button>
            {/* Additional buttons can be added here */}
          </div>
          <div className="trainList">
            <TrainList line={currColor} data={trainData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinesPage;
