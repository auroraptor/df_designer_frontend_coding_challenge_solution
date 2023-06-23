import React, { useEffect, useState } from "react";
import useCreateColumns from "../hooks/useCreateColumns";
import useMinimizeCrossings from "../hooks/useMinimizeCrossing";
import GraphEdge from "./GraphEdge";
import { GraphProps } from "../types/componentProps";
import { Edge, GraphData } from "../types/graph";

const createFakeGraphData = (): GraphData => {
  return {
    nodes: [],
    edges: [],
  };
};

const Graph: React.FC<GraphProps> = ({ graph }): React.ReactElement | null => {
  const [edges, setEdges] = useState<Edge[]>([]);
  const [renderEdges, setRenderEdges] = useState(false);
  const columns = useCreateColumns(graph || createFakeGraphData());
  useMinimizeCrossings(columns, graph.edges || []);

  useEffect(() => {
    setEdges(graph.edges || []);
  }, [graph]);

  useEffect(() => {
    if (edges.length > 0) {
      setRenderEdges(true);
    }
  }, [edges]);

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
                  border: "1px solid #4d4d4d",
                  borderRadius: "4px",
                  padding: "6px 12px",
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
