import { useEffect, useState } from "react";
import { Edge } from "./types/graph";

interface PropsConnector {
  edge: Edge;
  key: React.Key;
}

function Connector(props: PropsConnector) {
  const { edge } = props;
  const [coords, setCoords] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });

  useEffect(() => {
    setTimeout(() => {
      const fromEl = document.getElementById(String(edge.fromId));
      const toEl = document.getElementById(String(edge.toId));

      if (fromEl && toEl) {
        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();

        const x1 = fromRect.right;
        const y1 = fromRect.top + fromRect.height / 2;
        const x2 = toRect.left;
        const y2 = toRect.top + toRect.height / 2;

        setCoords({ x1, y1, x2, y2 });
      }
    }, 0);
  }, [edge]);

  if (edge)
    return (
      <svg
        style={{
          position: "absolute",
          top: Math.min(coords.y1, coords.y2),
          left: Math.min(coords.x1, coords.x2),
          width: "100%"
        }}
        className="svg"
      >
        <line
          x1={0}
          y1={0}
          x2={Math.abs(coords.x2 - coords.x1)}
          y2={Math.abs(coords.y2 - coords.y1)}
          stroke="black"
          strokeWidth="0.1"
        />
      </svg>
    );
  else return null;
}

export default Connector;
