import React, { useState } from 'react';
import './TrainColor.css';

const TrainColor = ({ selectedLine, setSelectedLine}) => {

    const lineNames = {
        gold: {
          name: 'Gold',
        },
        red: {
          name: 'Red',
        },
        blue: {
          name: 'Blue',
        },
        green: {
            name: 'Green',
          }
      };
  const handleLineChange = (line) => {
    setSelectedLine(line);
  };

  return (
    <div>
      <div>
        <div className = "buttonContainer">
        {Object.keys(lineNames).map((line) => (
          <button
            key={line}
            id={`train-${line}`} 
            onClick={() => handleLineChange(line)}
          >
            {lineNames[line].name}
          </button>
        ))}
        </div>
      </div>
    </div>
  );
};

export default TrainColor;
