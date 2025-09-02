# Project Development Documentation

This document provides detailed information about the project's architecture, development process, and solutions to technical challenges encountered.

## 1. Project Overview

This is a modern web game project built with a focus on maintainability, testability, and a clean separation of concerns.

- **Rendering:** [Pixi.js](https://pixijs.com/) v8
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Testing:** [Vitest](https://vitest.dev/)
- **Linting:** [ESLint](https://eslint.org/) v9
- **Formatting:** [Prettier](https://prettier.io/)
- **Server:** [Fastify](https://www.fastify.io/)

## 2. Architecture

The project follows a strict separation between game logic and rendering.

### 2.1. Logic vs. Rendering

- **Game Logic:** Located in `src/game/logic`. These are plain TypeScript classes that contain the game state and rules. They have no knowledge of the rendering engine. This separation allows for:
  - Easy unit testing without a rendering environment.
  - The possibility of moving the logic to a server in the future.
- **Rendering:** Located in `src/scenes` and other rendering-related directories. These classes are responsible for displaying the game state. They are typically `PIXI.Container` subclasses that read data from the logic classes and update the visuals accordingly.

### 2.2. Directory Structure

- `assets`: Contains all static game assets like images and fonts.
- `jules`: Contains agent-related documentation, plans, and reports.
- `server`: A simple Fastify server for API endpoints.
- `src`: The main source code of the game client.
  - `game/logic`: Game logic.
  - `game/rendering`: (Currently unused, `scenes` is preferred) Components responsible for rendering specific game elements.
  - `scenes`: High-level containers for different parts of the game (e.g., Start Scene, Game Scene).
  - `types`: Shared TypeScript type definitions.
- `.github/workflows`: CI/CD configuration.

## 3. Development Process

### 3.1. Tooling and Scripts

- `npm run dev`: Starts the Vite development server for the client.
-   `npm run serve`: Starts the Fastify server in development mode with watch enabled, using `tsx`.
-   `npm run build`: Compiles both the client and server for production.
-   `npm run start`: Starts the production server after a build.
- `npm run lint`: Lints the code using ESLint.
- `npm run format`: Formats the code using Prettier.
- `npm run test`: Runs unit tests using Vitest.
- `npm run coverage`: Runs unit tests and generates a coverage report.

### 3.2. Technical Decisions and Challenges

#### ESLint v9 Compatibility

**Problem:** The initial setup required using ESLint v9. However, the latest stable versions of `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin` at the time of setup were only compatible with ESLint v8.

**Solution:** After research, it was found that the alpha versions of the `@typescript-eslint` packages (`^8.0.0-alpha.31`) provided compatibility with ESLint v9. These versions were installed to satisfy the requirement. The configuration format was also updated to the new "flat config" (`eslint.config.js`).

#### Vitest `jsdom` Environment

**Problem:** The unit tests failed with the error `Cannot find package 'jsdom'`.

**Solution:** The `jsdom` package, required for the test environment specified in `vite.config.ts`, was not installed. Installing it as a development dependency (`npm install -D jsdom`) resolved the issue.
