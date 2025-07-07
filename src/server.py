from typing import Any

from mcp.server.fastmcp import FastMCP

# TodoList data storage - using in-memory storage
_todos: list[dict[str, Any]] = []


def load_todos() -> list[dict[str, Any]]:
    """Load todos from memory"""
    return _todos.copy()


def save_todos(todos: list[dict[str, Any]]) -> None:
    """Save todos to memory and auto-clear if all completed"""
    global _todos
    _todos = todos.copy()

    # Check if all tasks are completed, if so clear the list
    if _todos and all(todo["status"] == "completed" for todo in _todos):
        _todos.clear()


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

    # Check if the list was cleared
    if not _todos:
        return "All tasks completed! Todo list has been automatically cleared."

    return "Todos have been modified successfully. Ensure that you continue to use the todo list to track your progress. Please proceed with the current tasks if applicable"


def main():
    """Main entry point for the MCP server"""
    app.run()


if __name__ == "__main__":
    main()
