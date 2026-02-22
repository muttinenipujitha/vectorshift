
# 🚀 VectorShift Frontend Technical Assessment

## 📌 Overview

This repository contains my submission for the VectorShift Frontend Technical Assessment.

The project implements a dynamic pipeline builder using:

* **React + ReactFlow** (Frontend)
* **Zustand** (State Management)
* **FastAPI** (Backend)

The application allows users to visually build, validate, and export structured AI pipelines with DAG validation.

---

# 🧠 Application Workflow

This section explains how the system works end-to-end.

## 1️⃣ Node Creation

Users drag nodes from the toolbar onto the canvas.
Each node is generated with:

* Unique ID
* Configurable input/output handles
* Optional custom fields
* Centralized state management via Zustand

---

## 2️⃣ Node Connection

Users connect nodes using directional edges.

Connections are:

* Source → Target
* Validated structurally
* Styled for clarity
* Easily removable

---

## 3️⃣ Dynamic Text Parsing

Inside a Text node, users can define variables using:

```
{{ variableName }}
```

The system:

* Detects valid JavaScript identifiers using regex
* Automatically creates input handles for each variable
* Prevents duplicates
* Removes handles if variables are deleted
* Auto-resizes textarea dynamically

---

## 4️⃣ Pipeline Validation

When the user clicks **Execute**:

Frontend:

* Sends nodes and edges to backend

Backend:

* Counts number of nodes
* Counts number of edges
* Runs DFS-based cycle detection
* Validates LLM input requirements

Response format:

```json
{
  "num_nodes": 4,
  "num_edges": 3,
  "is_dag": true
}
```

Frontend then displays the validation result.

---

## 5️⃣ JSON Export

Users can export the entire pipeline as JSON, enabling:

* Persistence
* External processing
* Debugging
* Pipeline reuse

---

# 🧩 Assessment Requirements & Implementation

---

## 🔹 Part 1: Node Abstraction

A reusable `BaseNode` abstraction was created.

This abstraction:

* Eliminates duplicated layout logic
* Standardizes handle positioning
* Supports configurable fields
* Maintains consistent styling
* Enables rapid creation of new node types

### Additional Nodes Implemented

* API Node
* Condition Node
* Math Node
* Logger Node
* Delay Node

This demonstrates extensibility and maintainable architecture.

---

## 🔹 Part 2: Styling

A unified dark design system was implemented across:

* Canvas
* Nodes
* Toolbar
* Buttons
* Forms

Improvements include:

* Custom node shadows
* Gradient backgrounds
* Improved handle size & connection UX
* Hover micro-interactions
* Selection highlighting
* Smooth edge animations

ReactFlow default wrapper styles were overridden to achieve a clean visual system.

---

## 🔹 Part 3: Text Node Logic

### Auto-Resizing Textarea

Textarea height dynamically adjusts using `scrollHeight`, improving visibility and preventing overflow.

### Dynamic Variable Parsing

* Regex-based variable detection
* Unique variable tracking
* Automatic handle creation
* Handle removal on deletion
* Invalid syntax safely ignored

---

## 🔹 Part 4: Backend Integration

### Frontend

* Sends pipeline data via POST request
* Displays backend response in user-friendly format

### Backend

* Implements DFS cycle detection
* Validates LLM node constraints
* Ensures directed acyclic graph structure

DAG validation uses recursion stack tracking for cycle detection.

---

# 🏗️ Architectural Decisions

* Zustand for centralized state control
* ReactFlow for graph visualization
* DFS for efficient cycle detection
* Clear separation of concerns (UI vs validation)
* Extensible node abstraction design
* Reusable styling patterns

---

# 🧪 Testing Scenarios Covered

Functional Testing:

* Linear pipeline validation
* Multi-branch pipelines
* LLM validation rules
* Node deletion and edge cleanup
* JSON export correctness

Edge Cases:

* Empty pipeline
* Self-loop detection
* Multiple cycle detection
* Duplicate variable names
* Rapid variable typing
* Disconnected subgraphs
* Invalid variable syntax

---

# 📁 Project Structure

```
/frontend
  /src
    /nodes
      BaseNode.js
      InputNode.js
      TextNode.js
      LLMNode.js
      OutputNode.js
      AdditionalNodes.js
    submit.js
    store.js
    ui.js
    toolbar.js

/backend
  main.py
```

---

# ⚙️ Setup Instructions

## Frontend

```bash
cd frontend
npm install
npm start
```

Runs at:

```
http://localhost:3000
```

---

## Backend

```bash
cd backend
uvicorn main:app --reload
```

Runs at:

```
http://127.0.0.1:8000
```

---

# 🔮 Future Improvements

* Persist pipelines to database
* Undo/redo support
* Node grouping
* Real-time collaboration
* Execution engine simulation
* Authentication & workspace support

---

# 👩‍💻 Author

Pujitha Muttineni

Thank you for reviewing my submission.

I look forward to discussing architectural decisions and potential extensions.

