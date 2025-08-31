# Agent Instructions for "修仙卡牌" Project

This document provides guidelines for AI agents working on this codebase.

## Project Overview

This is a turn-based card game with a cultivation/fantasy theme, built with TypeScript and Pixi.js. The core gameplay revolves around drawing event cards and making choices that affect the player character's attributes and inventory.

## Tech Stack

-   **Language**: TypeScript
-   **Rendering**: Pixi.js
-   **Build Tool**: Vite (or similar modern bundler)
-   **Testing**: Vitest (or Jest)

## Key Architectural Principles

1.  **Strict Logic/Rendering Separation**: This is the most important rule.
    -   All game logic, state management, and rules must reside in `src/logic/`.
    -   The code in `src/logic/` **must not** have any dependency on Pixi.js or any other rendering-related library.
    -   All rendering code, which visualizes the game state, must reside in `src/rendering/`.
    -   Communication between logic and rendering happens through a clearly defined interface/bridge. The renderer sends user intents to the logic layer, and the logic layer emits events about state changes.

2.  **Test-Driven Development (TDD) for Logic**:
    -   All new logic functionality (e.g., a new card effect, a new game mechanic) **must** be accompanied by unit tests.
    -   Aim for a test coverage of over 90% for the `src/logic/` directory.
    -   Tests must be able to run without a browser environment (e.g., via Node.js).

3.  **Types are Law**:
    -   Use TypeScript's features to their full extent. Avoid `any` wherever possible.
    -   All core data structures (Cards, Characters, Events, etc.) must have their types or interfaces defined in `src/types/`.

## Development Workflow

1.  **Define Types**: Before implementing a new feature, define its data structures in `src/types/`.
2.  **Write Logic & Tests**: Implement the feature's logic in `src/logic/`, writing unit tests concurrently.
3.  **Implement Rendering**: Once the logic is complete and tested, create or update the necessary components in `src/rendering/` to display the new feature.
4.  **Update Documentation**: Document any significant design decisions or new systems in `jules.md`.

## How to Run & Test

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Run unit tests
npm run test
```
