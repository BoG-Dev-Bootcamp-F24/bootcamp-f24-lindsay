import React, { useEffect, useState } from "react";
import './NavBar.css';
import Station from './Station.jsx';


const NavBar = ({color,data}) => {
    const [stations, setStations] = useState([]);
    useEffect(() => {
      const filteredStations = data.filter(station => station.line === color);
      const uniqueStations = Array.from(new Set(filteredStations.map(station => station.name)))
        .map(name => filteredStations.find(station => station.name === name));
      setStations(uniqueStations);
    }, [data, color]);
  return (
    <nav className="navbar">
  <h2 className="stationPrompt">Select your starting station</h2>
  <div>
    {stations.length > 0 ? (
      <>
        <Station key="all-stations" station="All Stations" />
        {stations.map((station, index) => (
          <Station key={index} station={station.name} />
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
