import React, { useEffect, useState } from "react";
import './NavBar.css';
import Station from './Station.jsx';


const NavBar = ({color,data, setSelectedStation, selectedStation }) => {
    const [stations, setStations] = useState([]);
    
    useEffect(() => {
      const filteredStations = data.filter(station => station.line === color);
      const uniqueStations = Array.from(new Set(filteredStations.map(station => station.name)))
        .map(name => filteredStations.find(station => station.name === name));
      setStations(uniqueStations);
    }, [data, color]);

    const handleStationClick = (station) => {
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
              onClick={() => handleStationClick('')} 
              isSelected={selectedStation === ""}
          />
            {stations.map((station, index, ) => (
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
