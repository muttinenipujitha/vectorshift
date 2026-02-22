import { BaseNode } from "./BaseNode";

export const DelayNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Delay"
    inputs={[{ id: "in" }]}
    outputs={[{ id: "out" }]}
    fields={[
      { type: "text", key: "duration", placeholder: "1000ms" },
    ]}
  />
);