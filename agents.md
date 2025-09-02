# Agents.md

This document provides instructions for AI agents working on this codebase.

## Project Setup

This is a TypeScript-based web game project. To get started, run `npm install` to install all dependencies.

## Key Technologies

- **Rendering:** Pixi.js v8
- **Build Tool:** Vite
- **Testing:** Vitest
- **Server:** Fastify
- **Linting/Formatting:** ESLint v9, Prettier

## Development Workflow

1.  **Code Style:** All code must be formatted with Prettier and pass ESLint checks. Use `npm run format` and `npm run lint` before committing.
2.  **Logic and Rendering Separation:** A strict separation between logic and rendering is enforced.
    - Game logic (state, rules) goes into `src/game/logic`. These files should be plain TypeScript and not import any Pixi.js modules.
    - Rendering code (display objects, scenes) goes into `src/scenes`. These files are responsible for visualizing the state from the logic layer.
3.  **Testing:**
    - All new logic must be accompanied by unit tests.
    - Run tests with `npm run test`.
    - Aim for a high test coverage (>90%) for the logic parts. Check coverage with `npm run coverage`.
4.  **Commits:** Follow conventional commit standards for your commit messages.

## Running the Application

- **Development:**
  1.  Run `npm run serve` in one terminal to start the Fastify server with hot-reloading.
  2.  Run `npm run dev` in another terminal to start the Vite dev server for the client.
  3.  Open the client URL shown in the terminal (usually `http://localhost:8080` or `http://localhost:5173`).

- **Production:**
- Run `npm run build` to create a production-ready build in the `dist` folder.
  - Run `npm run start` to start the production server.

## Agent Instructions Verification

After making changes, please verify them by running the following commands:

1.  `npm run lint`
2.  `npm run format:check`
3.  `npm run test`
4.  `npm run build`
