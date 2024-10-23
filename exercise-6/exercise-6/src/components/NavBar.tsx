import { useEffect, useState } from "react";
import "./NavBar.css";
import Station from "./Station";

interface StationData {
  name: string;
  line: string;
}

interface NavBarProps {
  color: string;
  data: StationData[];
  setSelectedStation: (station: string) => void;
  selectedStation: string;
}

const NavBar = ({
  color,
  data,
  setSelectedStation,
  selectedStation,
}: NavBarProps) => {
  const [stations, setStations] = useState<StationData[]>([]);
  useEffect(() => {
    const filteredStations = data.filter((station) => station.line === color);
    const uniqueStationNames = new Set<string>();
    const uniqueStations: StationData[] = [];
    filteredStations.forEach((station) => {
      if (!uniqueStationNames.has(station.name)) {
        uniqueStationNames.add(station.name);
        uniqueStations.push(station);
      }
    });

    setStations(uniqueStations);
  }, [data, color]);

  const handleStationClick = (station: string) => {
    setSelectedStation(station);
  };

  return (
    <nav className="navbar">
      <h2 className="stationPrompt">Select your starting station</h2>
      <div>
        {stations.length > 0 ? (
          <>
            <Station
              key="all-stations"
              station="All stations"
              onClick={() => handleStationClick("")}
              isSelected={selectedStation === ""}
            />
            {stations.map((station, index) => (
              <Station
                key={index}
                station={station.name}
                onClick={() => handleStationClick(station.name)}
                isSelected={selectedStation === station.name}
              />
            ))}
          </>
        ) : (
          <p>No stations available for this line.</p>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
