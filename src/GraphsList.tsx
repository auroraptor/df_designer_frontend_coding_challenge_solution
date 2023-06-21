import { useState } from 'react';
import Graph from './Graph';
import useGraphsList from './hooks/useGraphsList';

const GraphsList = () => {
  const { graphs, loading, error } = useGraphsList();
  const [selectedGraph, setSelectedGraph] = useState<number | null>(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{padding: "30px"}}>
      <select 
        value={selectedGraph || ''}
        onChange={(e) => setSelectedGraph(Number(e.target.value))}
        style={{border: "2px dotted black", borderRadius: "10px", padding: "6px 12px"}}
      >
        {graphs?.map((_, index) => (
          <option key={index} value={index}>
            Graph {index + 1}
          </option>
        ))}
      </select>
      {selectedGraph !== null && <Graph id={selectedGraph} />}
    </div>
  );
};

export default GraphsList;