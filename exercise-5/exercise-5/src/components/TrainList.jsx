import React, { useEffect, useState } from "react";
import Train from "./Train";

const TrainList = ({data, line }) => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const filteredTrains = data.filter((train) => 
      train.line.toUpperCase() === line.toUpperCase()
    );
    setTrains(filteredTrains);
  }, [data, line]);

  return (
    <div>
      {trains.length > 0 ? (
        trains.map((train, index) => (
          <Train key={index} train={train} />
        ))
      ) : (
        <p>No trains are available for this line!</p>
      )}
    </div>
  );
};

export default TrainList;
