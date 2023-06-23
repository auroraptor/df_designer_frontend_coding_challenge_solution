import { GraphData, Edge } from "./graph";

export interface GraphProps {
  graph: GraphData;
}

export interface PropsGraphEdge {
  edge: Edge;
  key: React.Key;
}

export interface GraphsListProps {
  graphs: number[];
  selectedGraph: number | null;
  setSelectedGraph: (graphIndex: number | null) => void;
}