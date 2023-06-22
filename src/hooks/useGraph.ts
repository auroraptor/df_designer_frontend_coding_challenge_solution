import { useEffect, useState } from "react";
import { GraphData } from "../types/graph";

const useGraph = (id: number) => {
  const [graph, setGraph] = useState<GraphData>({
    nodes: [],
    edges: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const response = await fetch(`/api/graphs/${id}`);
        const data: GraphData = await response.json();
        setGraph(data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchGraph();
  }, [id]);

  return { graph, loading, error };
};

export default useGraph;