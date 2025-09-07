# Plan for Refactoring "Role" to "Character"

## Goal

The goal is to refactor all instances of "Role" to "Character" within the `logic-core` package to improve semantic clarity, as requested by the user. This includes class names, type names, file names, and documentation.

## Task Decomposition

1.  **Rename Core Files:**
    *   Rename `packages/logic-core/src/role.ts` to `packages/logic-core/src/character.ts`.
    *   Rename `packages/logic-core/src/role-manager.ts` to `packages/logic-core/src/character-manager.ts`.

2.  **Rename Test Files:**
    *   Rename `packages/logic-core/src/role.test.ts` to `packages/logic-core/src/character.test.ts`.
    *   Rename `packages/logic-core/src/role-manager.test.ts` to `packages/logic-core/src/character-manager.test.ts`.

3.  **Refactor Code Content:**
    *   In `packages/logic-core/src/types.ts`: Rename the `RoleType` enum to `CharacterType`.
    *   In `packages/logic-core/src/character.ts`: Rename the `Role` class to `Character` and `RoleType` to `CharacterType`.
    *   In `packages/logic-core/src/character-manager.ts`: Rename the `RoleManager` class to `CharacterManager` and update all internal type references (`Role` to `Character`, `RoleType` to `CharacterType`).
    *   In `packages/logic-core/src/character.test.ts`: Update all class and type references from `Role` to `Character`.
    *   In `packages/logic-core/src/character-manager.test.ts`: Update all class and type references from `RoleManager` and `Role` to `CharacterManager` and `Character`.

4.  **Update Package Exports:**
    *   In `packages/logic-core/src/index.ts`, update the export paths from `./role.js` and `./role-manager.js` to `./character.js` and `./character-manager.js`.

5.  **Verification:**
    *   Run the test suite (`pnpm test`) to confirm that the refactoring was successful and all tests still pass.

6.  **Update Documentation:**
    *   Create a new report `jules/plan009-report.md`.
    *   Update `jules.md` to replace all occurrences of `Role` with `Character`.

7.  **Final Verification:**
    *   Run all verification scripts specified in `agents.md` (`lint`, `format:check`, `test:ci`, `build`) to ensure the changes are clean and production-ready.
