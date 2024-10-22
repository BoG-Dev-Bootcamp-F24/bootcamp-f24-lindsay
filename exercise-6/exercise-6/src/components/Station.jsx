import React from "react";
import "./Station.css";

const Station = ({ station, onClick, isSelected }) => {
  return (
    <button 
      className={`stationContainer ${isSelected ? "selected" : ""}`} 
      onClick={onClick}
    >
      {station}
    </button>
  );
};

export default Station;