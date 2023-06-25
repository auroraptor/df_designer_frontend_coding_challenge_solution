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
  const [columns, setColumns] = useState(() =>
    useCreateColumns(graph || createFakeGraphData())
  );
  useMinimizeCrossings(columns, graph.edges || []);

  useEffect(() => {
    setColumns(useCreateColumns(graph || createFakeGraphData()));
  }, [graph]);

  useEffect(() => {
    setEdges(graph.edges || []);
  }, [graph]);

  useEffect(() => {
    if (edges.length > 0) {
      setRenderEdges(true);
    }
  }, [edges]);

  const handleDragStart = (event: React.DragEvent, nodeId: string) => {
    event.dataTransfer.setData("nodeId", nodeId);
  };

  const handleDrop = (event: React.DragEvent, columnId: number) => {
    event.preventDefault();
    const nodeId = event.dataTransfer.getData("nodeId");
  
    let draggedNode;
    let draggedNodeIndex;
    let draggedNodeColumnIndex;
    for (let i = 0; i < columns.length; i++) {
      const index = columns[i].findIndex((node) => String(node.id) === nodeId);
      if (index !== -1) {
        draggedNode = columns[i][index];
        draggedNodeIndex = index;
        draggedNodeColumnIndex = i;
        break;
      }
    }
  
    const newColumns = [...columns];
    if (draggedNodeColumnIndex !== undefined && draggedNodeIndex !== undefined)
    newColumns[draggedNodeColumnIndex].splice(draggedNodeIndex, 1);
  

    if (draggedNode !== undefined)
    newColumns[columnId].push(draggedNode);
  
    setColumns(newColumns);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "30px",
      }}
    >
      {columns?.map((column, index) => (
        <div
          key={index}
          onDrop={(event) => handleDrop(event, index)}
          onDragOver={handleDragOver}
        >
          <h2>Level {index + 1}</h2>
          <ul style={{ listStyle: "none", padding: "0", textAlign: "center" }}>
            {column.map((node) => (
              <li
                key={node.id}
                id={`${node.id}`}
                draggable
                onDragStart={(event) => handleDragStart(event, String(node.id))}
                style={{
                  border: "1px solid #4d4d4d",
                  borderRadius: "4px",
                  padding: "6px 12px",
                  margin: "10px 0",
                  cursor: "move",
                  zIndex: "-1"
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
