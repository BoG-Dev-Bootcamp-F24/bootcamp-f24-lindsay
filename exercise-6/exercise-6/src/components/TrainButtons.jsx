import React from 'react';
import './TrainButtons.css'; 

const TrainButtons = ({ currColor, selectedDirections, setSelectedDirections, selectedStatus, setSelectedStatus }) => {

  const lineButtons = {
    green: ['Arriving', 'Scheduled', 'Eastbound', 'Westbound'],
    gold: ['Arriving', 'Scheduled', 'Northbound', 'Southbound'],
    red: ['Arriving', 'Scheduled', 'Northbound', 'Southbound'],
    blue: ['Arriving', 'Scheduled', 'Eastbound', 'Westbound'],
  };

  const handleTrainButtonClick = (direction) => {
    const initialDir = direction.charAt(0); 
    setSelectedDirections(prevDirections => {
      if (prevDirections.includes(initialDir)) {
        return prevDirections.filter(d => d !== initialDir); //if i already had initialdir, deselect
      } 
      return [...prevDirections, initialDir];
    });
  };
  

  const handleStatusClick = (status) => {
    if (selectedStatus === status) {
        setSelectedStatus(null);
    } else {
        setSelectedStatus(status);
    }
  };
  

  const createButtons = () => {
    const directions = lineButtons[currColor].filter(direction => direction !== "Arriving" && direction !== "Scheduled");

    return (
      <>
        <button
          className={`train-button ${selectedStatus === "Arriving" ? 'active' : ''}`}
          onClick={() => handleStatusClick("Arriving")}
        >
          Arriving
        </button>

        <button
          className={`train-button ${selectedStatus === "Scheduled" ? 'active' : ''}`}
          onClick={() => handleStatusClick("Scheduled")}
        >
          Scheduled
        </button>
        {directions.map((direction) => (
          <button 
            key={direction} 
            className={`train-button ${selectedDirections.includes(direction.charAt(0)) ? 'active' : ''}`} 
            onClick={() => handleTrainButtonClick(direction)} 
          >
            {direction}
          </button>
        ))}
      </>
    );
  };

  return <div className="trainButtons">{createButtons()}</div>;
};

export default TrainButtons;
