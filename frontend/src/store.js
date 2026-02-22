import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

const hasCycle = (nodes, edges) => {
  const adjacency = {};
  nodes.forEach((node) => {
    adjacency[node.id] = [];
  });

  edges.forEach((edge) => {
    adjacency[edge.source].push(edge.target);
  });

  const visited = new Set();
  const stack = new Set();

  const dfs = (node) => {
    if (stack.has(node)) return true;
    if (visited.has(node)) return false;

    visited.add(node);
    stack.add(node);

    for (let neighbor of adjacency[node]) {
      if (dfs(neighbor)) return true;
    }

    stack.delete(node);
    return false;
  };

  for (let node of nodes) {
    if (dfs(node.id)) return true;
  }

  return false;
};

const validateLLMConnections = (nodes, edges) => {
  const llmNodes = nodes.filter((node) => node.type === "llm");

  for (let llm of llmNodes) {
    const inputs = edges.filter((e) => e.target === llm.id);
    const handles = inputs.map((e) => e.targetHandle);

    if (!handles.includes(`${llm.id}-system`) ||
        !handles.includes(`${llm.id}-prompt`)) {
      return false;
    }
  }

  return true;
};

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},

  getNodeID: (type) => {
    const ids = { ...get().nodeIDs };
    ids[type] = (ids[type] || 0) + 1;
    set({ nodeIDs: ids });
    return `${type}-${ids[type]}`;
  },

  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        },
        get().edges
      ),
    });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, [fieldName]: fieldValue } }
          : node
      ),
    });
  },

  validatePipeline: () => {
    const { nodes, edges } = get();

    if (hasCycle(nodes, edges)) {
      return { valid: false, message: "Pipeline has a cycle!" };
    }

    if (!validateLLMConnections(nodes, edges)) {
      return { valid: false, message: "LLM must have system & prompt connected!" };
    }

    return { valid: true, message: "Pipeline is valid!" };
  },
  
}));
