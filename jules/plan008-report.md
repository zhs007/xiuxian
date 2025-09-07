# Plan 008 Report: Implementing Role and RoleManager

## Task Summary

The objective was to introduce `Role` and `RoleManager` classes into the `logic-core` package to manage character instances in the game.

## Implementation Process

1.  **Extended `types.ts`**: A `RoleType` enum was added to `packages/logic-core/src/types.ts` to differentiate between `PLAYER` and `NPC` roles.

2.  **Created `Role` Class**:
    *   A new file, `packages/logic-core/src/role.ts`, was created.
    *   The `Role` class was implemented with properties for `id` (a unique UUID), `name`, the source `card`, `type`, and a `Map` for `attributes`.
    *   The `uuid` library was added as a dependency to generate unique IDs for each role.
    *   It includes `getAttribute` and `setAttribute` methods for flexible attribute management, with `getAttribute` defaulting to `0` for unset attributes.

3.  **Created `RoleManager` Class**:
    *   A new file, `packages/logic-core/src/role-manager.ts`, was created.
    *   The `RoleManager` class was implemented to manage the lifecycle of `Role` instances.
    *   It uses a `Map` to store roles, keyed by their unique ID.
    *   Methods were added to create, retrieve, and list all roles.

4.  **Updated `index.ts`**: The main entry point for the package, `packages/logic-core/src/index.ts`, was updated to export the new `Role` and `RoleManager` classes.

5.  **Unit Testing**:
    *   `vitest` was added as a dev dependency to the `logic-core` package.
    *   Test files (`role.test.ts` and `role-manager.test.ts`) were created to ensure the functionality of the new classes.
    *   A `test` script was added to the `package.json` of `logic-core`.
    *   An issue with ES module imports requiring file extensions (`.js`) was resolved in the test files.
    *   All tests were run and confirmed to pass.

## Challenges and Solutions

*   **Missing `uuid` dependency**: The `uuid` library was not available. It was added as a dependency to `packages/logic-core`.
*   **TypeScript ES Module Import Paths**: The TypeScript compiler, configured for ES modules, required explicit `.js` extensions in relative import paths. This was resolved by updating the import statements in the test files.
*   **Missing Test Script**: The `logic-core` package lacked a `test` script in its `package.json`. This was added to enable running `vitest` via the top-level `pnpm test` command.

## Outcome

The `Role` and `RoleManager` classes were successfully implemented and integrated into the `logic-core` package, complete with passing unit tests. The new components provide a solid foundation for character management in the application.
