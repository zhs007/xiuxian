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
- `npm run serve`: Starts the Fastify server in development mode with watch enabled, using `tsx`.
- `npm run build`: Compiles both the client and server for production.
- `npm run start`: Starts the production server after a build.
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

### 3.3. Architectural Patterns

#### Screen Scaling and Layout ("Fit" Scaling)

The game is designed for a portrait resolution of 1080x1920. To accommodate various device screens, a "Fit" scaling strategy is used.

- **HTML/CSS:** The main `index.html` body uses CSS Flexbox (`display: flex`, `justify-content: center`, `align-items: center`) to center the game canvas within the viewport. The page background is white, providing a letterbox effect if the viewport's aspect ratio does not match the game's.
- **Pixi.js:** The `main.ts` script contains a `resize` function that dynamically calculates the best scale factor to fit the 1080x1920 canvas within the window while maintaining its aspect ratio. It then sets the `style.width` and `style.height` of the canvas element accordingly. The Pixi app itself has a black background.

#### Simple Scene Management

A lightweight, event-driven scene manager is implemented in `main.ts`.

- **Structure:** A `currentScene` variable in `main.ts` holds a reference to the currently active scene. All scenes (e.g., `StartScene`, `MainScene`) must have an `update` method.
- **Transitions:** Scene transitions are triggered by events. For example, `StartScene` emits a `startgame` event when the "New Game" button is clicked. The `main.ts` file listens for this event, removes the `currentScene` from the stage, instantiates the new `MainScene`, adds it to the stage, and updates the `currentScene` reference.
- **Game Loop:** The main application ticker in `main.ts` calls `currentScene.update(delta)` on every frame, ensuring only the active scene is updated.

#### Asset Handling with Vite

Static assets like images are handled by Vite's asset import system.

- **Import:** An asset is imported into a TypeScript file, which provides a URL to the asset (e.g., `import cardImageUrl from '../../assets/cards/card.png'`).
- **Loading:** This URL is then passed to `PIXI.Assets.load()` to be loaded by the Pixi loader. This works seamlessly with Vite's development server and build process, ensuring assets are correctly bundled and referenced.
