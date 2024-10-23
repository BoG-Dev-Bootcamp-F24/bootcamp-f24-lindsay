import "./Train.css";

interface TrainProps {
  train: {
    line: string;
    station: string;
    destination: string;
    delay: string;
    waitingTime: string;
  };
}

const Train = ({ train }: TrainProps) => {
  const isOnTime = train.delay === "T0S";
  const waitingTime = train.waitingTime.split(" ")[0];

  const capitalizeWords = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const capitalStation = capitalizeWords(train.station);
  const capitalDest = capitalizeWords(train.destination);

  return (
    <div className="container">
      <div className="trainContainer">
        <div className="leftSide">
          <span className="station">
            {capitalStation} &rarr; {capitalDest}
          </span>
          <div className="detailsContainer">
            <span className="iconContainer">
              <span className="line">{train.line}</span>
            </span>
            <span className={`status ${isOnTime ? "on-time" : "delayed"}`}>
              {isOnTime ? "On time" : "Delayed"}
            </span>
          </div>
        </div>
        <div className="waitingTime">
          <span className="waitingTimeNum">{waitingTime}</span>
          {waitingTime !== "Arriving" && <span className="minutes">min</span>}
        </div>
      </div>
    </div>
  );
};

export default Train;
