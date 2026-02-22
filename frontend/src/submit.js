import { useStore } from "./store";

export const SubmitButton = () => {
  const { nodes, edges, validatePipeline } = useStore();

  const handleSubmit = async () => {
    const validation = validatePipeline();

    if (!validation.valid) {
      alert(validation.message);
      return;
    }

    const pipelineData = { nodes, edges };

    try {
      const response = await fetch(
        "http://localhost:8000/pipelines/parse",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pipelineData),
        }
      );

      const result = await response.json();
      alert(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  const handleExport = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify({ nodes, edges }, null, 2));

    const link = document.createElement("a");
    link.href = dataStr;
    link.download = "pipeline.json";
    link.click();
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: 20,
      marginTop: 20
    }}>
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          borderRadius: 8,
          border: "none",
          background: "#2563eb",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
        }}
      >
        Execute Pipeline
      </button>

      <button
        onClick={handleExport}
        style={{
          padding: "10px 20px",
          borderRadius: 8,
          border: "1px solid #334155",
          background: "#1e293b",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer"
        }}
      >
        Export JSON
      </button>
    </div>
  );
};