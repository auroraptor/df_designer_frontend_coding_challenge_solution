import { GraphsListProps } from "../types/componentProps";

const GraphsList: React.FC<GraphsListProps> = ({
  graphs,
  selectedGraph,
  setSelectedGraph,
}) => {
  return (
    <div style={{ padding: "30px" }}>
      <select
        value={selectedGraph !== null ? selectedGraph : ""}
        onChange={(e) => setSelectedGraph(Number(e.target.value))}
        style={{
          border: "1px solid #4d4d4d",
          borderRadius: "4px",
          padding: "12px 6px",
        }}
      >
        <option value="" disabled>
          Select your graph
        </option>
        {graphs.map((_, index) => (
          <option key={index} value={index}>
            Graph {index + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GraphsList;
