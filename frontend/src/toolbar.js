import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      <DraggableNode type="input" label="Input" />
      <DraggableNode type="llm" label="LLM" />
      <DraggableNode type="output" label="Output" />
      <DraggableNode type="text" label="Text" />
      <DraggableNode type="api" label="API" />
      <DraggableNode type="condition" label="Condition" />
      <DraggableNode type="math" label="Math" />
      <DraggableNode type="logger" label="Logger" />
      <DraggableNode type="delay" label="Delay" />
    </div>
  );
};
