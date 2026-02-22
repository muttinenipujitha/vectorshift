import { BaseNode } from "./BaseNode";

export const MathNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Math"
    inputs={[{ id: "a" }, { id: "b" }]}
    outputs={[{ id: "result" }]}
    fields={[
      {
        type: "select",
        key: "operation",
        options: ["Add", "Subtract", "Multiply", "Divide"],
      },
    ]}
  />
);