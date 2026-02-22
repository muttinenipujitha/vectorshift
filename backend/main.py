from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Pipeline(BaseModel):
    nodes: List[Dict]
    edges: List[Dict]

def is_dag(nodes, edges):
    graph = {node["id"]: [] for node in nodes}
    
    for edge in edges:
        graph[edge["source"]].append(edge["target"])
    
    visited = set()
    stack = set()

    def dfs(node):
        if node in stack:
            return False
        if node in visited:
            return True
        
        stack.add(node)
        visited.add(node)
        
        for neighbor in graph[node]:
            if not dfs(neighbor):
                return False
        
        stack.remove(node)
        return True

    return all(dfs(node) for node in graph)

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    return {
        "num_nodes": len(pipeline.nodes),
        "num_edges": len(pipeline.edges),
        "is_dag": is_dag(pipeline.nodes, pipeline.edges),
    }