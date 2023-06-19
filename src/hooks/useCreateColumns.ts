import { GraphData } from "../types/graph";

const useCreateColumns = (graph: GraphData) => {
  const nodeIds = graph.nodes.map((node) => node.id);
  const nodeIdsWithIncomingEdges = new Set(
    graph.edges.map((edge) => edge.toId)
  );
  const startNodeIds = nodeIds.filter(
    (nodeId) => !nodeIdsWithIncomingEdges.has(nodeId)
  );

  const columns = [
    graph.nodes.filter((node) => startNodeIds.includes(node.id)),
  ];

  while (columns.flat().length < graph.nodes.length) {
    const previousColumn = columns[columns.length - 1];

    const nextColumnNodeIds = new Set(
      graph.edges
        .filter((edge) =>
          previousColumn.map((node) => node.id).includes(edge.fromId)
        )
        .map((edge) => edge.toId)
    );

    const nextColumn = graph.nodes.filter((node) =>
      nextColumnNodeIds.has(node.id)
    );

    columns.push(nextColumn);
  }

  return columns;
};

export default useCreateColumns;
