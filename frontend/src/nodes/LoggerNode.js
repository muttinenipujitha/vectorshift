import { BaseNode } from "./BaseNode";

export const LoggerNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Logger"
    inputs={[{ id: "in" }]}
    fields={[
      {
        type: "select",
        key: "level",
        options: ["Info", "Warning", "Error"],
      },
    ]}
  />
);