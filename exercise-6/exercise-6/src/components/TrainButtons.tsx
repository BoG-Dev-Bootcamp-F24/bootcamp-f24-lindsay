import "./TrainButtons.css";

interface TrainButtonsProps {
  currColor: string;
  selectedDirections: string[];
  setSelectedDirections: (directions: string[]) => void;
  selectedStatus: string | null;
  setSelectedStatus: (status: string | null) => void;
}

const TrainButtons = ({
  currColor,
  selectedDirections,
  setSelectedDirections,
  selectedStatus,
  setSelectedStatus,
}: TrainButtonsProps) => {
  const lineButtons: { [key: string]: string[] } = {
    green: ["Arriving", "Scheduled", "Eastbound", "Westbound"],
    gold: ["Arriving", "Scheduled", "Northbound", "Southbound"],
    red: ["Arriving", "Scheduled", "Northbound", "Southbound"],
    blue: ["Arriving", "Scheduled", "Eastbound", "Westbound"],
  };

  const handleTrainButtonClick = (direction: string) => {
    const initialDir = direction.charAt(0);
    let updatedDirections: string[];
    if (selectedDirections.includes(initialDir)) {
      updatedDirections = selectedDirections.filter((d) => d !== initialDir);
    } else {
      updatedDirections = [...selectedDirections, initialDir];
    }
    setSelectedDirections(updatedDirections);
  };

  const handleStatusClick = (status: string) => {
    setSelectedStatus(selectedStatus === status ? null : status);
  };

  const createButtons = () => {
    const directions = lineButtons[currColor].filter(
      (direction) => direction !== "Arriving" && direction !== "Scheduled"
    );

    return (
      <>
        <button
          className={`train-button ${
            selectedStatus === "Arriving" ? "active" : ""
          }`}
          onClick={() => handleStatusClick("Arriving")}
        >
          Arriving
        </button>

        <button
          className={`train-button ${
            selectedStatus === "Scheduled" ? "active" : ""
          }`}
          onClick={() => handleStatusClick("Scheduled")}
        >
          Scheduled
        </button>

        {directions.map((direction) => (
          <button
            key={direction}
            className={`train-button ${
              selectedDirections.includes(direction.charAt(0)) ? "active" : ""
            }`}
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
