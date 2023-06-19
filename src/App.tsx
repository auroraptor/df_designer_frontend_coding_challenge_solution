import { useState } from "react";
import GraphsList from "./GraphsList";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <GraphsList />
  );
}

export default App;
