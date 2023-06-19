import React, { useState } from 'react';
import useGraph from './hooks/useGraph';
import useCreateColumns from './hooks/useCreateColumns';
import { GraphData } from './types/graph';

  

const Graph: React.FC<{ id: number }> = ({ id }) => {
    const { graph, loading, error } = useGraph(id);
    const columns = graph ? useCreateColumns(graph) : null;
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (graph) {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {columns?.map((column, index) => (
            <div key={index}>
              <h2>Column {index + 1}</h2>
              <ul>
                {column.map((node) => (
                  <li key={node.id}>{node.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }
    
    return null;
  };
  


export default Graph;
