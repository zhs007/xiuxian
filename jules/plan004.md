# Plan for Project Refactoring to pnpm and Turborepo Monorepo

## 1. Goal

The goal of this task is to refactor the existing project to use `pnpm` and `Turborepo`, converting it into a monorepo structure. A new package, `logic-core`, will be created to house the core game logic, and the existing application will be moved into its own package and made dependent on `logic-core`.

## 2. Task Decomposition

I will break down the task into the following steps:

### Step 1: Initialize Monorepo Structure

1.  **Initialize pnpm workspace:** Create a `pnpm-workspace.yaml` file in the root directory to define the package locations (`apps/*` and `packages/*`).
2.  **Setup root `package.json`:** Create a new `package.json` at the root. This will contain workspace-wide dev dependencies like `turbo`, `typescript`, `prettier`, and `eslint`, as well as the scripts that will be run by Turborepo.
3.  **Initialize Turborepo:** Create a `turbo.json` file to configure the task pipeline.

### Step 2: Restructure Existing Application

1.  **Create `apps/game` directory:** Create a new directory `apps/game`.
2.  **Move application files:** Move the following files and directories from the root into `apps/game`:
    - `src/`
    - `assets/`
    - `server/`
    - `index.html`
    - `vite.config.ts`
    - `tsconfig.json`
    - `tsconfig.node.json`
    - `tsconfig.server.json`
    - `eslint.config.js`
    - `.prettierrc`
3.  **Adapt `apps/game/package.json`:** Move the original `package.json` to `apps/game` and update it by:
    - Changing the name (e.g., to `@xiuxian/game`).
    - Removing dev dependencies that will be hoisted to the root.
    - Keeping package-specific dependencies (`pixi.js`, `gsap`, `fastify`).

### Step 3: Create `logic-core` Package

1.  **Create `packages/logic-core` directory:** Create a new directory for the shared logic package.
2.  **Initialize `package.json`:** Create a `package.json` for `logic-core` (e.g., name: `@xiuxian/logic-core`).
3.  **Add `tsconfig.json`:** Create a `tsconfig.json` for a standard TypeScript library.
4.  **Create source file:** Create an initial `packages/logic-core/src/index.ts` file.

### Step 4: Configure Dependencies and Build Paths

1.  **Add workspace dependency:** In `apps/game/package.json`, add a dependency on `logic-core` using the pnpm workspace protocol: `"@xiuxian/logic-core": "workspace:*"`.
2.  **Update tsconfig paths:** Ensure `tsconfig.json` in `apps/game` can correctly resolve the `logic-core` package. The `paths` property might need to be configured if not handled automatically by the setup.
3.  **Configure `turbo.json`:** Define the pipeline tasks (`dev`, `build`, `test`, `lint`, `format`) and their dependencies in `turbo.json`. For example, the `build` task for `game` should depend on the `build` task of `logic-core`.

### Step 5: Verify the Setup

1.  **Install dependencies:** Run `pnpm install` from the root directory.
2.  **Run verification scripts:** Execute the scripts defined in `agents.md` using the new setup:
    - `pnpm lint`
    - `pnpm format:check`
    - `pnpm test:ci`
    - `pnpm build`
3.  **Run development server:** Confirm that the application runs correctly in development mode.

### Step 6: Update Documentation

1.  **Create Task Report:** After successful implementation, create `jules/plan004-report.md` detailing the process, challenges, and solutions.
2.  **Update `jules.md`:** Update the main development document to reflect the new monorepo structure, pnpm/Turborepo usage, and development workflow.
3.  **Update `agents.md`:** Update `agents.md` with the new commands (`pnpm` instead of `npm`) and any other changes relevant to an AI agent working on the codebase.

## 3. Approval

I will now proceed with this plan.
