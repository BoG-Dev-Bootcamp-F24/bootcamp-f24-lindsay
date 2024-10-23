import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import TrainList from "../components/TrainList";
import TrainColor from "../components/TrainColor";
import TrainButtons from "../components/TrainButtons";
import "./LinesPage.css";

interface Station {
  id: number;
  name: string;
  line: string;
}

interface Train {
  line: string;
  station: string;
  destination: string;
  direction: string;
  delay: string;
  waitingTime: string;
}

const fetchStationData = async (): Promise<Station[]> => {
  const response = await axios.get("http://localhost:5000/api/stations");
  return response.data;
};

const fetchTrainData = async (): Promise<Train[]> => {
  const response = await axios.get("http://localhost:5000/api/trains");
  return response.data;
};

export default function LinesPage() {
  const [currColor, setCurrColor] = useState<string>("gold");
  const [stationData, setStationData] = useState<Station[]>([]);
  const [trainData, setTrainData] = useState<Train[]>([]);
  const [selectedStation, setSelectedStation] = useState<string>("");
  const [selectedDirections, setSelectedDirections] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const stations = await fetchStationData();
      const trains = await fetchTrainData();
      setStationData(stations);
      setTrainData(trains);
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
          <TrainColor selectedLine={currColor} setSelectedLine={setCurrColor} />
        </div>
        <h1 className="title">{currColor.toUpperCase()}</h1>
        <div className="linesPageContainer">
          <div className="navBar">
            <NavBar
              color={currColor}
              data={stationData}
              setSelectedStation={setSelectedStation}
              selectedStation={selectedStation}
            />
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
