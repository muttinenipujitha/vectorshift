import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

import { InputNode } from "./nodes/inputNode";
import { OutputNode } from "./nodes/outputNode";
import { LLMNode } from "./nodes/llmNode";
import { TextNode } from "./nodes/textNode";
import { ApiNode } from "./nodes/ApiNode";
import { ConditionNode } from "./nodes/ConditionNode";
import { MathNode } from "./nodes/MathNode";
import { LoggerNode } from "./nodes/LoggerNode";
import { DelayNode } from "./nodes/DelayNode";

import "reactflow/dist/style.css";

const nodeTypes = {
  input: InputNode,
  output: OutputNode,
  llm: LLMNode,
  text: TextNode,
  api: ApiNode,
  condition: ConditionNode,
  math: MathNode,
  logger: LoggerNode,
  delay: DelayNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds =
        reactFlowWrapper.current.getBoundingClientRect();

      const data = event.dataTransfer.getData("application/reactflow");

      if (!data) return;

      const { nodeType } = JSON.parse(data);

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(nodeType);

      const newNode = {
        id: nodeID,
        type: nodeType,
        position,
        data: {},
        selectable: true,
  draggable: true,
      };
      addNode(newNode);
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  return (
   <div
  ref={reactFlowWrapper}
  style={{
    width: "100vw",
    height: "75vh",
    background: "#0f172a",
  }}
>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onInit={setReactFlowInstance}
      fitView
  connectionMode="loose"
  connectionRadius={40}
  snapToGrid
  snapGrid={[20, 20]}
  deleteKeyCode={["Delete", "Backspace"]}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
