import { useEffect, useState } from "react";
import { GraphData } from "../types/graph";

const useGraph = (id: number | null) => {
  const [graph, setGraph] = useState<GraphData | null>({
    nodes: [],
    edges: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        setLoading(true);
        if (id === null) {
          setGraph(null);
          setLoading(false);
          return;
        }
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
