import { BaseNode } from "./BaseNode";

export const LLMNode = ({ id }) => (
  <BaseNode
    id={id}
    title="LLM"
    inputs={[
      { id: "system" },
      { id: "prompt" },
    ]}
    outputs={[{ id: "response" }]}
  />
);
