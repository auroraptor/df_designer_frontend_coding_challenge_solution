export type Node = {
  id: number;
  name: string;
};

export type Edge = {
  fromId: number;
  toId: number;
};

export type GraphData = {
  nodes: Array<Node>;
  edges: Array<Edge>;
};
