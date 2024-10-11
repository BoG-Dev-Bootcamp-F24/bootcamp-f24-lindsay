import React from "react";
import "./Train.css";

const Train = ({ train }) => {
  const isOnTime = train.DELAY === "T0S";
  const waitingTime =  train.waitingTime.split(" ")[0];
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
              <span className="lineBadge">{train.line}</span>
            </span>
            <span className={`status ${isOnTime ? "on-time" : "delayed"}`}>
              {isOnTime ? "On time" : "Delayed"}
            </span>
          </div>
        </div>
        <div className="waitingTime">
        <span className="waitingTimeNum">{waitingTime}</span>
              {waitingTime !== "Arriving" && (
                <span className="minutes">min</span>
              )}
            </div>
      </div>
    </div>
  );
};

function capitalizeWords(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
export default Train;
