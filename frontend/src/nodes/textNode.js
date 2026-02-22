import { useState, useEffect, useRef } from "react";
import { Handle, Position } from "reactflow";
import { useStore } from "../store";

export const TextNode = ({ id }) => {
  const [text, setText] = useState("");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const updateNodeField = useStore((s) => s.updateNodeField);
  useEffect(() => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const matches = [...text.matchAll(regex)];
    const unique = [...new Set(matches.map((m) => m[1]))];
    setVariables(unique);
  }, [text]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [text]);

  return (
    <div
      style={{
        width: 240,
        minHeight: 140,
        padding: 16,
        borderRadius: 12,
        background: "#1e293b",
        border: "1px solid #334155",
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
          color: "#fff",
        }}
      >
        Text
      </div>

      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          updateNodeField(id, "text", e.target.value);
        }}
        style={{
          width: "100%",
          padding: "6px 8px",
          borderRadius: 6,
          border: "1px solid #475569",
          background: "#0f172a",
          color: "#fff",
          resize: "none",
          boxSizing: "border-box",
        }}
      />

      {/* Default input */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-default`}
        style={{
          top: 60,
          width: 14,
          height: 14,
          background: "#38bdf8",
          border: "2px solid #0f172a",
        }}
      />

      {/* Dynamic variable handles */}
      {variables.map((v, i) => (
        <Handle
          key={v}
          type="target"
          position={Position.Left}
          id={`${id}-${v}`}
          style={{
            top: 90 + i * 25,
            width: 14,
            height: 14,
            background: "#38bdf8",
            border: "2px solid #0f172a",
          }}
        />
      ))}

      {/* Output */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-out`}
        style={{
          top: 60,
          width: 14,
          height: 14,
          background: "#f59e0b",
          border: "2px solid #0f172a",
        }}
      />
    </div>
  );
};