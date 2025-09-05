# Plan 005: Dependency Update and Documentation

## Goal

The user wants to refactor the project to use the latest versions of pnpm and Turborepo and ensure the project is a proper monorepo.

## Initial Analysis

A review of the codebase revealed that the project is already a pnpm/Turborepo monorepo with the desired structure (`apps/game` depending on `packages/logic-core`). The user's request to use the "latest versions" is the key actionable item.

Therefore, this plan focuses on updating all project dependencies to their latest stable versions, verifying the project's integrity after the update, and creating the documentation artifacts requested by the user.

## Task Decomposition

1.  **Dependency Analysis and Update.**
    *   Check for outdated dependencies across the entire monorepo using `pnpm outdated`.
    *   Update all dependencies to their latest stable versions using `pnpm update --latest -r`.

2.  **Verification and Testing.**
    *   After the updates, run all the verification steps outlined in `agents.md` to ensure the project is still in a healthy state.
    *   This includes `pnpm install`, `turbo lint`, `turbo format:check`, `turbo test:ci`, and `turbo build`.
    *   Debug and fix any issues that arise from the dependency upgrades. This included fixing two warnings from the Turborepo output.

3.  **Documentation.**
    *   Create this plan file, `jules/plan005.md`.
    *   Once the task is complete, create a corresponding report, `jules/plan005-report.md`.
    *   Update the main development document, `jules.md`, with any relevant information or challenges encountered during the upgrade process.
    *   Review `agents.md` to determine if any changes are needed.

4.  **Submission.**
    *   Once all tests pass and documentation is complete, request a code review and then submit the changes.
