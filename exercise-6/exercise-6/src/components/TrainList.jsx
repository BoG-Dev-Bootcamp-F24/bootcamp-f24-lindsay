import React, { useEffect, useState } from "react";
import Train from "./Train";

const TrainList = ({ data, line, station, selectedDirections, selectedStatus }) => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const formattedStation = station === "" ? null : `${station} station`.toUpperCase();

    const filteredTrains = data.filter((train) => 
      train.line.toUpperCase() === line.toUpperCase() && 
      (formattedStation ? train.station.toUpperCase() === formattedStation : true) &&
      (selectedDirections.length === 0 || selectedDirections.includes(train.direction.charAt(0))) &&
      (!selectedStatus || 
        (selectedStatus === "Arriving" && train.waitingTime.split(" ")[0] === "Arriving") ||
        (selectedStatus === "Scheduled" && train.waitingTime.split(" ")[0]!== "Arriving"))
    );

    setTrains(filteredTrains);
  }, [data, line, station, selectedDirections, selectedStatus]);

  return (
    <div>
      {trains.length > 0 ? (
        trains.map((train, index) => (
          <Train key={index} train={train} />
        ))
      ) : (
        <p>No trains match these filters!</p>
      )}
    </div>
  );
};

export default TrainList;
