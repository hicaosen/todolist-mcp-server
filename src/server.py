import json
from pathlib import Path
from typing import Any

from mcp.server.fastmcp import FastMCP

# TodoList data storage
TODO_FILE = Path.home() / ".todolist.json"


def load_todos() -> list[dict[str, Any]]:
    """Load todos from file"""
    if not TODO_FILE.exists():
        return []

    try:
        with open(TODO_FILE, encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
        return []


def save_todos(todos: list[dict[str, Any]]) -> None:
    """Save todos to file"""
    with open(TODO_FILE, "w", encoding="utf-8") as f:
        json.dump(todos, f, indent=2, ensure_ascii=False)


# Create FastMCP server
app = FastMCP("TodoList Server")


@app.tool()
def todo_read() -> list[dict[str, Any]]:
    """Read all todos from the todo list

    Returns:
        List of todos with their status, priority, and content
    """
    return load_todos()


@app.tool()
def todo_write(todos: list[dict[str, Any]]) -> str:
    """Write/update todos to the todo list

    Args:
        todos: List of todo items, each containing:
            - content: Task description (string)
            - id: Unique task identifier (string)
            - priority: Priority level ("high", "medium", "low")
            - status: Task status ("pending", "in_progress", "completed")

    Returns:
        Success message
    """
    # Validate todo structure
    for todo in todos:
        required_fields = ["content", "id", "priority", "status"]
        for field in required_fields:
            if field not in todo:
                raise ValueError(f"Missing required field: {field}")

        if todo["priority"] not in ["high", "medium", "low"]:
            raise ValueError(f"Invalid priority: {todo['priority']}")

        if todo["status"] not in ["pending", "in_progress", "completed"]:
            raise ValueError(f"Invalid status: {todo['status']}")

    save_todos(todos)
    return "Todos have been modified successfully. Ensure that you continue to use the todo list to track your progress. Please proceed with the current tasks if applicable"


def main():
    """Main entry point for the MCP server"""
    app.run()


if __name__ == "__main__":
    main()
