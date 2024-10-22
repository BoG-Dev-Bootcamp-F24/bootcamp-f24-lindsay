import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import TrainList from "../components/TrainList";
import TrainColor from "../components/TrainColor";
import TrainButtons from "../components/TrainButtons";
import "./LinesPage.css";

const fetchStationData = async () => await axios.get("http://localhost:5000/api/stations");
const fetchTrainData = async () => await axios.get("http://localhost:5000/api/trains");

export default function LinesPage() {
  const [currColor, setCurrColor] = useState('gold');
  const [stationData, setStationData] = useState([]);
  const [trainData, setTrainData] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');
  const [selectedDirections, setSelectedDirections] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      const stations = await fetchStationData();
      const trains = await fetchTrainData();
      setStationData(stations.data);
      setTrainData(trains.data);
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    setSelectedDirections([]); 
    setSelectedStatus(null);   
  }, [currColor]);  
  return (
    <div>
      <div className="generalContainer">
        <div className="trainColor">
          <TrainColor 
            selectedLine={currColor} 
            setSelectedLine={setCurrColor} 
          />
        </div>
        <h1 className="title">{currColor.toUpperCase()}</h1>
        <div className="linesPageContainer">
          <div className="navBar">
            <NavBar color={currColor} data={stationData} setSelectedStation={setSelectedStation} selectedStation={selectedStation} />
          </div>
          <div className="trainListContainer">
            <div className="trainButtons">
              <TrainButtons 
                currColor={currColor} 
                selectedDirections={selectedDirections} 
                setSelectedDirections={setSelectedDirections}
                selectedStatus={selectedStatus} 
                setSelectedStatus={setSelectedStatus} 
              />
            </div>
            <div className="trainList">
              <TrainList 
                line={currColor} 
                data={trainData} 
                station={selectedStation} 
                selectedDirections={selectedDirections} 
                selectedStatus={selectedStatus} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
