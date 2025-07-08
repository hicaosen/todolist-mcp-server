# TodoList MCP Server for AI Agents

This project provides a Model Context Protocol (MCP) server designed to function as a robust, external "working memory" or "task manager" for Large Language Models (LLMs) and AI Agents. It is not intended for direct human use but rather as a critical backend tool that enables AI to reliably execute complex, multi-step tasks.

## The Core Problem for AI

LLMs operate within a limited "context window." For complex tasks requiring numerous steps, they can "forget" the initial plan, lose track of their progress, or fail to manage state effectively. This tool directly addresses that limitation.

## Core Value for AI Agents

By integrating this `todolist` server, an AI agent gains:

- **Reliable State Management**: It transforms a vague, conversational plan into a structured, machine-readable state machine. The AI is forced to track task status (`pending`, `in_progress`, `completed`), ensuring no steps are missed.
- **Persistent "Working Memory"**: The todo list acts as an external, reliable memory store. The AI can offload its plan and progress, query it at any time with `todo_read`, and stay on track without being constrained by its context window.
- **Enhanced Execution Reliability**: It encourages a systematic `read-modify-write` workflow, compelling the AI to consciously assess its current state before proceeding. This dramatically reduces errors and deviations from the plan.
- **Transparent & Auditable Workflow**: The todo list provides a clear, real-time log of the AI's actions. This transparency is invaluable for debugging, monitoring, and building trust in the agent's execution capabilities.
- **Intelligent Auto-Clear**: Once all tasks are marked `completed`, the list automatically resets. This signals the successful completion of the overall task and prepares the workspace for a new one, creating a clean, satisfying task loop.

## How AI Agents Use This Tool

An AI agent interacts with the server following a simple yet powerful loop:

1.  **Plan & Initialize**: First, the agent breaks down a complex user request into a series of actionable steps and uses `todo_write` to populate the list, setting all tasks to `pending`.
2.  **Read (Assess State)**: Before taking action, the agent calls `todo_read` to get the current, complete state of all tasks.
3.  **Modify (Update State)**: The agent identifies the next task, marks it as `in_progress`, performs the action, and then marks it as `completed`. This entire state update is prepared locally.
4.  **Write (Commit State)**: The agent calls `todo_write` with the *entire updated list*, atomically committing the new state to the server.

This `read-modify-write` cycle ensures that every action is deliberate and based on the most current state of the world.

---

## Technical Details

### Features

- **In-memory todo storage** with session-based persistence.
- **Intelligent auto-clear** functionality.
- **Task validation** with duplicate ID prevention.
- **Priority levels** (`high`, `medium`, `low`) and status tracking.
- **MCP-compliant** tools for seamless integration.

### MCP Tools Provided

#### `todo_read`
Returns the current todo list. The AI should use this frequently to track progress and decide on the next action.

```python
# No parameters required
# Returns a list of todo items
todos = todo_read()
```

#### `todo_write`
Creates or overwrites the entire todo list. This is the primary mechanism for an AI to update task status.

```python
# Expects a list of todo items
todos = [
    {
        "id": "task-1",
        "content": "Implement user authentication",
        "priority": "high",
        "status": "in_progress"
    },
    {
        "id": "task-2", 
        "content": "Write unit tests for authentication",
        "priority": "medium",
        "status": "pending"
    }
]
todo_write(todos)
```

### Todo Item Structure

Each todo item is a dictionary that **must** contain:
- `id`: A unique string identifier for the task.
- `content`: A non-empty string describing the task.
- `priority`: One of `"high"`, `"medium"`, or `"low"`.
- `status`: One of `"pending"`, `"in_progress"`, or `"completed"`.

---

## Setup and Configuration

### Requirements
- Python 3.12+
- Poetry (recommended) or pip

### Installation
```bash
# Clone the repository
git clone https://github.com/hicaosen/todolist.git
cd todolist

# Install dependencies
poetry install
# or with pip
pip install -e .
```

### Running the Server
```bash
# Using the installed script
todolist-mcp-server

# Or directly with Python
python -m src.server
```

### MCP Client Configuration for AI

To connect this server to your MCP-enabled AI client, add the following to your configuration:

```json
{
  "mcpServers": {
    "todolist": {
      "command": "uvx",
      "args": [
        "todolist-mcp-server"
      ]
    }
  }
}
```

## Development

### Code Quality Tools
```bash
# Lint code
ruff check

# Format code
ruff format

# Type checking
pyright
```

## License

This project is licensed under the MIT License.
