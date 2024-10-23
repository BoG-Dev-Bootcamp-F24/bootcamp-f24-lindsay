import "./TrainColor.css";

interface TrainColorProps {
  selectedLine: string;
  setSelectedLine: (line: string) => void;
}

type LineNames = {
  [key: string]: { name: string };
};

const TrainColor = ({ selectedLine, setSelectedLine }: TrainColorProps) => {
  const lineNames: LineNames = {
    gold: { name: "Gold" },
    red: { name: "Red" },
    blue: { name: "Blue" },
    green: { name: "Green" },
  };

  const handleLineChange = (line: string) => {
    setSelectedLine(line);
  };

  return (
    <div>
      <div>
        <div className="buttonContainer">
          {Object.keys(lineNames).map((line) => (
            <button
              key={line}
              id={`train-${line}`}
              onClick={() => handleLineChange(line)}
              className={selectedLine === line ? "active" : ""}
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
