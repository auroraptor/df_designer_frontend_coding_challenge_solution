import { useState } from "react";
import GraphsList from "./GraphsList";
import useGraphsList from "./hooks/useGraphsList";
import Graph from "./Graph";
import "./App.css";

function App() {
  const { graphs, loading, error } = useGraphsList();
  const [selectedGraph, setSelectedGraph] = useState<number | null>(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{`Oops! :( ${error.message}`}</div>;
  }

  return (
    <>
      <GraphsList
        graphs={graphs}
        selectedGraph={selectedGraph}
        setSelectedGraph={setSelectedGraph}
      />
      {selectedGraph !== null && <Graph id={selectedGraph} />}
    </>
  );
}

export default App;
