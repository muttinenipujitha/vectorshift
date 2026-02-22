import { BaseNode } from "./BaseNode";

export const ApiNode = ({ id }) => (
  <BaseNode
    id={id}
    title="API"
    inputs={[{ id: "in" }]}
    outputs={[{ id: "response" }]}
    fields={[
        
      { type: "text", key: "url", placeholder: "https://api.com" },
    ]}
  />
);