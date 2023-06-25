import { GraphData, Edge, Node } from "./graph";

export interface GraphProps {
  graph: GraphData;
}

export interface PropsGraphEdge {
  edge: Edge;
  key: React.Key;
  columns: Node[][];
}

export interface GraphsListProps {
  graphs: number[];
  selectedGraph: number | null;
  setSelectedGraph: (graphIndex: number | null) => void;
}