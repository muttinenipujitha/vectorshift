import { BaseNode } from "./BaseNode";

export const OutputNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Output"
    inputs={[{ id: "in" }]}
    fields={[
      { type: "text", key: "name", placeholder: "Output Name" },
    ]}
  />
  
);
