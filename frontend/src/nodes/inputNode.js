import { BaseNode } from "./BaseNode";

export const InputNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Input"
    outputs={[{ id: "out" }]}
    fields={[
      { type: "text", key: "name", placeholder: "Input Name" },
      { type: "select", key: "type", options: ["Text", "File"] },
    ]}
  />
);
