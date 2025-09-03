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

## Asset Handling

- Static assets (images, fonts) are located in the `assets` directory.
- To use an asset in the code, import it directly. Vite will handle the URL resolution.
  - Example: `import myImage from '../assets/images/my-image.png';`
  - This `myImage` variable can then be used with a loader like `PIXI.Assets.load()`.

## Architectural Patterns

### Scene Management

The project uses a singleton `SceneManager` (`src/scenes/SceneManager.ts`) to control the game's scenes.

- **Usage:** To switch scenes, get the instance and call `SceneManager.getInstance().switchScene(NewScene)`.
- **Lifecycle:** The manager automatically handles destroying the previous scene (calling `.destroy({ children: true })`) to prevent memory leaks. Do not manually add or remove scenes from the stage.

### Logic and View Separation

A strict separation between logic and view is enforced, particularly for complex scenes.
- **Example (`MainScene`):** The complex drag/swipe calculations are not performed in `MainScene.ts`. Instead, they are located in pure functions in `src/game/logic/mainScreen.ts`.
- **Workflow:** The view (`MainScene`) captures user input, passes it to the pure logic functions, and then applies the returned values to the Pixi.js objects.
- **Testing:** All new gameplay logic should be in a `logic` file and be covered by unit tests.

## Agent Instructions Verification

After making changes, please verify them by running the following commands:

1.  `npm run lint`
2.  `npm run format:check`
3.  `npm run test:ci` (Note: use the `test:ci` script for non-interactive testing)
4.  `npm run build`
