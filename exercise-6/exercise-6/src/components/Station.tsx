import "./Station.css";

interface StationProps {
  station: string;
  onClick: () => void;
  isSelected: boolean;
}

const Station = ({ station, onClick, isSelected }: StationProps) => {
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
