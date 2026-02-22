import { Handle, Position } from "reactflow";
import { useStore } from "../store";

export const BaseNode = ({
  id,
  title,
  inputs = [],
  outputs = [],
  fields = [],
  children,
}) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <div
      style={{
        width: 240,
        minHeight: 120,
        padding: 16,
        borderRadius: 12,
        background: "#1e293b",
        border: "1px solid #334155",
        boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontWeight: 600,
          fontSize: 14,
          color: "#fff",
        }}
      >
        {title}
      </div>

      {fields.map((field) => {
        if (field.type === "text") {
          return (
            <input
              key={field.key}
              placeholder={field.placeholder}
              onChange={(e) =>
                updateNodeField(id, field.key, e.target.value)
              }
              style={{
                width: "100%",
                padding: "6px 8px",
                borderRadius: 6,
                border: "1px solid #475569",
                background: "#0f172a",
                color: "#fff",
                fontSize: 12,
                boxSizing: "border-box",
              }}
            />
          );
        }

        if (field.type === "select") {
          return (
            <select
              key={field.key}
              onChange={(e) =>
                updateNodeField(id, field.key, e.target.value)
              }
              style={{
                width: "100%",
                padding: "6px 8px",
                borderRadius: 6,
                border: "1px solid #475569",
                background: "#0f172a",
                color: "#fff",
                fontSize: 12,
                boxSizing: "border-box",
              }}
            >
              {field.options.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          );
        }

        return null;
      })}

      {children}

      {/* INPUT HANDLES */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{
            top: 40 + index * 25,
            width: 14,
            height: 14,
            background: "#38bdf8",
            border: "2px solid #0f172a",
          }}
        />
      ))}

      {/* OUTPUT HANDLES */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{
            top: 40 + index * 25,
            width: 14,
            height: 14,
            background: "#f59e0b",
            border: "2px solid #0f172a",
          }}
        />
      ))}
    </div>
  );
};