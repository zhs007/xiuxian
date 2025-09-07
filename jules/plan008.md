# Plan for Implementing Role and RoleManager

## Goal

The goal is to introduce the concept of a `Role` (a character instance) and a `RoleManager` to manage these roles within the `logic-core` package.

## Task Decomposition

1.  **Modify `types.ts`:**
    *   Add a `RoleType` enum with `PLAYER` and `NPC` values.

2.  **Create `packages/logic-core/src/role.ts`:**
    *   Implement the `Role` class.
    *   Properties:
        *   `id`: string (unique)
        *   `name`: string
        *   `card`: Card
        *   `type`: RoleType
        *   `attributes`: Map<string, number>
    *   Constructor:
        *   Accepts a `Card` and a `RoleType`.
        *   Initializes properties. `id` should be a unique generated string.
    *   Methods:
        *   `getAttribute(name: string): number`: Retrieves an attribute's value. If not present, initializes it to `0` and returns `0`.
        *   `setAttribute(name: string, value: number)`: Sets an attribute's value.

3.  **Create `packages/logic-core/src/role-manager.ts`:**
    *   Implement the `RoleManager` class.
    *   Properties:
        *   `roles`: Map<string, Role>
    *   Methods:
        *   `createRole(card: Card, type: RoleType): Role`: Creates a `Role` instance, stores it, and returns it.
        *   `getRole(id: string): Role | undefined`: Retrieves a role by its ID.
        *   `getAllRoles(): Role[]`: Returns an array of all managed roles.

4.  **Update `packages/logic-core/src/index.ts`:**
    *   Export the new `Role` and `RoleManager` classes.

5.  **Create Unit Tests:**
    *   Create `packages/logic-core/src/role.test.ts` to test the `Role` class.
    *   Create `packages/logic-core/src/role-manager.test.ts` to test the `RoleManager` class.

6.  **Documentation:**
    *   Create `jules/plan008-report.md` to document the implementation process.
    *   Update `jules.md` with the design details of the new classes.

7.  **Review `AGENTS.md`:**
    *   Check if the changes require any updates to `AGENTS.md`.
