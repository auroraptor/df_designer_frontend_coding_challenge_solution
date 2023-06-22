import React, { useEffect, useState } from "react";
import useGraph from "./hooks/useGraph";
import useCreateColumns from "./hooks/useCreateColumns";
import useMinimizeCrossings from "./hooks/useMinimizeCrossing";
import GraphEdge from "./GraphEdge";
import { Edge, GraphData } from "./types/graph";

const createFakeGraphData = () => {
  return {
    nodes: [],
    edges: [],
  }
}

const Graph: React.FC<{ id: number }> = ({ id }): React.ReactElement | null => {
  const { graph, loading, error } = useGraph(id);

  if (!graph) {
    return null;
  }

  const columns = useCreateColumns(graph || createFakeGraphData());
  useMinimizeCrossings(columns, graph.edges || []);

  if (error) {
    return <div>{`Oops! :( ${error.message}`}</div>;
  }

  const [edges, setEdges] = useState<Edge[]>([]);
  const [renderEdges, setRenderEdges] = useState(false);

  useEffect(() => {
    if (graph) {
      setEdges(graph.edges);
    }
  }, [graph]);

  useEffect(() => {
    if (edges.length > 0) {
      setRenderEdges(true);
    }
  }, [edges]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "30px",
      }}
    >
      {columns?.map((column, index) => (
        <div key={index}>
          <h2>Level {index + 1}</h2>
          <ul style={{ listStyle: "none", padding: "0", textAlign: "center" }}>
            {column.map((node) => (
              <li
                key={node.id}
                id={`${node.id}`}
                style={{
                  border: "2px solid black",
                  borderRadius: "10px",
                  padding: "6px 10px",
                  margin: "10px 0",
                }}
              >
                {node.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {renderEdges &&
        edges.map((edge) => (
          <GraphEdge key={edge.fromId + "-" + edge.toId} edge={edge} />
        ))}
    </div>
  );
};

export default Graph;
