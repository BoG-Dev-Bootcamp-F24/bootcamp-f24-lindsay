import React from "react";
import "./Station.css";

const Station = ({ station }) => {
  return (
    <div className="scontainer">
      <div className="stationContainer">
            {station}
      </div>
    </div>
  );
};

export default Station;
