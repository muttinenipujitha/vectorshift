import { BaseNode } from "./BaseNode";

export const ConditionNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Condition"
    inputs={[{ id: "in" }]}
    outputs={[{ id: "true" }, { id: "false" }]}
    fields={[
      { type: "text", key: "expression", placeholder: "x > 10" },
    ]}
  />
);