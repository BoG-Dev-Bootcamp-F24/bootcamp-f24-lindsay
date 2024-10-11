import React, { useEffect, useState } from "react";
import './NavBar.css';
import Station from './Station.jsx';


const NavBar = ({color,data}) => {
    const [stations, setStations] = useState([]);
    useEffect(() => {
      const filteredStations = data.filter(station => station.line === color);
      setStations(filteredStations);
    }, [data, color]);
  return (
    <nav className="navbar">
      <h2>Select your starting station</h2>
      <div>
      {stations.length > 0 ? (
        stations.map((station, index) => (
          <Station key={index} station = {station.name} />
        ))
      ) : (
        <p>No stations available for this line.</p>
      )}
    </div>
    </nav>
  );
};

export default NavBar;
