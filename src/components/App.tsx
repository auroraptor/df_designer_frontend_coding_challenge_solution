import { useState } from "react";
import GraphsList from "./GraphsList";
import useGraphsList from "../hooks/useGraphsList";
import useGraph from "../hooks/useGraph";
import Graph from "./Graph";

function App() {
  const { graphs, loading: graphsLoading, error: graphsError } = useGraphsList();
  const [selectedGraph, setSelectedGraph] = useState<number | null>(null);
  const { graph, loading: graphLoading, error: graphError } = useGraph(selectedGraph);
  
  if (graphsLoading || graphLoading) {
    return <div>Loading...</div>;
  }

  if (graphsError || graphError) {
    return <div>{`Oops! :( ${graphsError?.message || graphError?.message}`}</div>;
  }

  return (
    <>
      <GraphsList
        graphs={graphs}
        selectedGraph={selectedGraph}
        setSelectedGraph={setSelectedGraph}
      />
      {selectedGraph !== null && graph && <Graph graph={graph} />}
    </>
  );
}

export default App;
