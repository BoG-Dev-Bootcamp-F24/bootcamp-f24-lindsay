import { useEffect, useState } from "react";
import Train from "./Train";

interface TrainData {
  line: string;
  station: string;
  destination: string;
  direction: string;
  delay: string;
  waitingTime: string;
}

interface TrainListProps {
  data: TrainData[];
  line: string;
  station: string;
  selectedDirections: string[];
  selectedStatus: string | null;
}

const TrainList = ({
  data,
  line,
  station,
  selectedDirections,
  selectedStatus,
}: TrainListProps) => {
  const [trains, setTrains] = useState<TrainData[]>([]);

  useEffect(() => {
    const formattedStation =
      station === "" ? null : `${station} station`.toUpperCase();

    const filteredTrains = data.filter(
      (train) =>
        train.line.toUpperCase() === line.toUpperCase() &&
        (formattedStation
          ? train.station.toUpperCase() === formattedStation
          : true) &&
        (selectedDirections.length === 0 ||
          selectedDirections.includes(train.direction.charAt(0))) &&
        (!selectedStatus ||
          (selectedStatus === "Arriving" &&
            train.waitingTime.split(" ")[0] === "Arriving") ||
          (selectedStatus === "Scheduled" &&
            train.waitingTime.split(" ")[0] !== "Arriving"))
    );

    setTrains(filteredTrains);
  }, [data, line, station, selectedDirections, selectedStatus]);

  return (
    <div>
      {trains.length > 0 ? (
        trains.map((train, index) => <Train key={index} train={train} />)
      ) : (
        <p>No trains match these filters!</p>
      )}
    </div>
  );
};

export default TrainList;
