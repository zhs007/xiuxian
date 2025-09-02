# Plan for Initializing a Modern Web Game Project

This plan outlines the steps to set up a modern web game project using Pixi.js, TypeScript, Vite, and other modern development tools.

1.  _Project Initialization and Dependency Installation._
    - Initialize a new npm project.
    - Install all necessary dependencies:
      - `pixi.js` for rendering.
      - `typescript` for the language.
      - `vite` as the build tool.
      - `vitest` for testing.
      - `@vitest/coverage-v8` for code coverage.
      - `eslint` (v9) and related plugins for linting.
      - `prettier` for code formatting.
      - `fastify` for the server.
      - And all necessary type definitions (`@types/*`).

2.  _Directory and Basic File Structure Setup._
    - Create the main directories: `src`, `assets`, `server`, and `jules`.
    - Inside `src`, create subdirectories for `game` (with `logic` and `rendering` sub-folders), `scenes`, and `types`.
    - Inside `assets`, create subdirectories for `images` and `fonts`.
    - Create an empty `index.html` file in the root.
    - Create a main entry point `src/main.ts`.

3.  _Configuration Files Setup._
    - Create `vite.config.ts` with proxy settings for the Fastify server.
    - Create `tsconfig.json` with strict type checking.
    - Create `eslint.config.js` with modern TypeScript rules.
    - Create `.prettierrc` with preferred formatting options.
    - Add `lint`, `format`, `dev`, `build`, `test`, and `coverage` scripts to `package.json`.

4.  _Simple Fastify Server Implementation._
    - In the `server` directory, create `index.ts`.
    - Implement a simple Fastify server with an `/api/echo` endpoint.

5.  _Game Implementation: Start Screen._
    - **Logic (`src/game/logic`):** Implement a simple state for the start screen (e.g., which button is hovered).
    - **Rendering (`src/scenes`):**
      - Create a `StartScene.ts` class that extends `PIXI.Container`.
      - Load a placeholder logo and create "New Game" and "Continue Game" buttons.
      - The rendering part will listen to the logic part for state changes.
    - **Main Entry (`src/main.ts`):** Initialize Pixi.js and add the start scene to the stage.

6.  _Unit Testing._
    - Create test files for the game logic (`src/game/logic/startScreen.test.ts`).
    - Write tests to achieve over 90% coverage for the logic part.

7.  _CI/CD with GitHub Actions._
    - Create a `.github/workflows/ci.yml` file.
    - The workflow will:
      - Install dependencies.
      - Run ESLint.
      - Run Prettier check.
      - Run tests with coverage.

8.  _Documentation._
    - Create `jules/plan001.md` with this plan.
    - Create `jules.md` as the main developer documentation.
    - Create `agents.md` with instructions for AI agents.
    - After completing the implementation, create `jules/plan001-report.md`.

9.  _Final Verification._
    - Run `npm audit` to ensure there are no vulnerabilities.
    - Run all checks: `lint`, `format:check`, `test`.
    - Build the project using `npm run build`.
    - Run the dev server and manually check if the start screen appears correctly.
