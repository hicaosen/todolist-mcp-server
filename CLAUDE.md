# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TodoList MCP Server - a Model Context Protocol server for managing todo lists. The server provides `todo_read` and `todo_write` tools that implement in-memory todo list storage with auto-clear functionality when all tasks are completed.

## Development Commands

### Code Quality
- **Lint**: `ruff check` - Check code style and potential issues
- **Format**: `ruff format` - Format code according to project standards  
- **Type check**: `pyright` - Run static type checking

### Running the Server
- **Start server**: `python -m src.server` or `todolist-mcp-server`

## Architecture

The server is built using FastMCP and implements two main tools:

### Core Components
- `server.py:70-178` - Main FastMCP server with todo_read and todo_write tools
- `server.py:22-68` - In-memory storage system with validation and auto-clear logic
- `server.py:7-17` - Type definitions for TodoItem, TodoStatus, and TodoPriority

### Key Features
- **In-memory storage**: Todos are stored in `_todos` global variable
- **Auto-clear**: When all todos are completed, the list automatically clears
- **Validation**: Strict validation for todo structure and duplicate IDs
- **Status tracking**: Three states: pending, in_progress, completed
- **Priority levels**: high, medium, low

## Task Management Usage

The todo tools are designed for task planning and tracking:
- Use `todo_write` for complex multi-step tasks (3+ steps)
- Use `todo_read` frequently to check progress
- Always mark tasks as completed immediately after finishing
- Only have one task in_progress at a time
- Auto-clear occurs when all tasks reach completed status

## Python Configuration

- **Target version**: Python 3.12+
- **Dependencies**: mcp[cli] (>=1.10.1,<2.0.0)
- **Line length**: 88 characters
- **Import style**: isort with single-line imports disabled