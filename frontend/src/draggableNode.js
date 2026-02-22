export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: type })
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      onDragStart={onDragStart}
      draggable
      style={{
        cursor: "grab",
        padding: "10px 15px",
        background: "#1e293b",
        color: "white",
        borderRadius: "6px",
      }}
    >
      {label}
    </div>
  );
};