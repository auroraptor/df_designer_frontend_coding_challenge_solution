import { Node, Edge } from "../types/graph";

const useMinimizeCrossings = (
  columns: Array<Array<Node>>,
  edges: Array<Edge>
) => {
  let improved = true;

  while (improved) {
    improved = false;

    for (let i = 0; i < columns.length - 1; i++) {
      const column = columns[i];
      const nextColumn = columns[i + 1];
      console.log('column: ', column);

      const newOrder = [...nextColumn].sort((nodeA, nodeB) => {
        const nodeAParents = edges
          .filter((edge) => edge.toId === nodeA.id)
          .map((edge) => edge.fromId);
        const nodeBParents = edges
          .filter((edge) => edge.toId === nodeB.id)
          .map((edge) => edge.fromId);

        const nodeAOrder = nodeAParents.map((parentId) =>
          column.findIndex((node) => node.id === parentId)
        );
        const nodeBOrder = nodeBParents.map((parentId) =>
          column.findIndex((node) => node.id === parentId)
        );

        const nodeAAvg =
          nodeAOrder.reduce((acc, val) => acc + val, 0) / nodeAOrder.length;
        const nodeBAvg =
          nodeBOrder.reduce((acc, val) => acc + val, 0) / nodeBOrder.length;

        return nodeAAvg - nodeBAvg;
      });

      if (JSON.stringify(newOrder) !== JSON.stringify(nextColumn)) {
        improved = true;
        columns[i + 1] = newOrder;
      }
    }
  }

  return columns;
};

export default useMinimizeCrossings;
