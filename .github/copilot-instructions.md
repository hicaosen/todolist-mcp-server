# GitHub Copilot Instructions

This file provides guidance to GitHub Copilot when working with code in this repository.

## Project Overview

This is a TodoList MCP Server - a Model Context Protocol server for managing todo lists with in-memory storage and auto-clear functionality.

## Code Style and Standards

### Python Standards
- Target Python 3.12+
- Use type hints for all functions and variables
- Follow PEP 8 with 88 character line length
- Use ruff for linting and formatting
- Use pyright for type checking

### Code Quality Requirements
- Always run `ruff check` before committing
- Run `pyright` to ensure type safety
- Maintain comprehensive type annotations
- Follow existing patterns in the codebase

## Architecture Guidelines

### Core Components
- `server.py` contains the main FastMCP server implementation
- Use `_todos` global variable for in-memory storage
- Implement proper validation for all todo operations
- Maintain the auto-clear functionality when all tasks are completed

### Todo Item Structure
```python
class TodoItem(TypedDict):
    content: str
    id: str
    priority: TodoPriority  # "high", "medium", "low"
    status: TodoStatus      # "pending", "in_progress", "completed"
```

### Tool Implementation
- `todo_read()` - Returns current todo list, no parameters
- `todo_write(todos)` - Updates todo list with validation
- Always validate todo structure and check for duplicate IDs
- Implement proper error handling with descriptive messages

## Development Practices

### Security
- Never log or expose sensitive information
- Validate all input data thoroughly
- Use proper error handling without exposing internals

### Testing and Validation
- Always validate todo items before saving
- Check for duplicate IDs across all todos
- Ensure all required fields are present
- Test auto-clear functionality

### Code Organization
- Keep functions focused and single-purpose
- Use descriptive variable and function names
- Maintain consistent error handling patterns
- Follow the existing logging setup

## MCP Server Guidelines

### FastMCP Usage
- Use `@app.tool()` decorator for tool functions
- Include comprehensive docstrings for all tools
- Return appropriate data types for MCP consumption
- Handle errors gracefully with user-friendly messages

### Tool Documentation
- Provide clear usage instructions in docstrings
- Explain when and how to use each tool
- Include parameter descriptions and return types
- Document any limitations or special behaviors

## Dependencies
- `mcp[cli]` (>=1.10.1,<2.0.0) - Core MCP functionality
- `ruff` - Code linting and formatting
- `pyright` - Static type checking

## Commands
- `ruff check` - Lint code
- `ruff format` - Format code
- `pyright` - Type check
- `python -m src.server` - Run server