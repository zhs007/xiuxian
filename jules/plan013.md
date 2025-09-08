# Plan for Task 10: Character Attributes System

This document outlines the plan to implement the character attribute system as requested in Task 10.

## 1. Task Understanding

The goal is to expand the `logic-core` package by introducing a comprehensive attribute system for characters. This system needs to be extensible, using strings for attribute keys. The core deliverables are:

- **New Attributes**:
    - **Age**: Simple numeric value.
    - **Cultivation Stage**: A single number encoding both major and minor cultivation levels.
    - **Cultivation XP (Current & Max)**: Numeric values to track progression. Max XP will be sourced from a static configuration.
    - **Spiritual Root**: A bitmask representing elemental affinities and potential mutations.
    - **Spirit Stones**: A numeric value for in-game currency.
- **Utility Functions**:
    - A function to translate the cultivation stage number into a human-readable string (e.g., "炼气初期 1 阶").
    - A function to translate the spiritual root bitmask into a descriptive string (e.g., "天灵根（土）", "异灵根（雷）").
- **Documentation**:
    - A new `docs/attributes.md` file detailing all attributes.
    - Updates to the main `jules.md` development document.
    - A final report (`jules/plan013-report.md`).
    - A review and potential update of `agents.md`.

## 2. Task Decomposition (Plan)

1.  ***Initial Setup & Plan Creation.***
    - Create this plan file (`jules/plan013.md`).
    - Run `pnpm install` to ensure the development environment is ready.

2.  ***Create Attribute Documentation.***
    - Create a new directory `docs/`.
    - Inside `docs/`, create `attributes.md` and document all the new attributes.

3.  ***Define Core Constants and Types.***
    - Create `packages/logic-core/src/constants.ts` for attribute name strings, cultivation stage IDs, and spiritual root bitmasks.
    - Create `packages/logic-core/src/config/cultivation.ts` for the static max XP data.

4.  ***Implement Spiritual Root Logic.***
    - Create `packages/logic-core/src/utils/spiritual-root.ts`.
    - Implement the `getReadableSpiritualRoot(rootValue: number): string` function.
    - Create `packages/logic-core/src/utils/spiritual-root.test.ts` with comprehensive unit tests.

5.  ***Implement Cultivation Stage Logic.***
    - Create `packages/logic-core/src/utils/cultivation.ts`.
    - Implement the `getReadableCultivationStage(stage: number, maxXP: number, currentXP: number): string` function.
    - Create `packages/logic-core/src/utils/cultivation.test.ts` with unit tests for all cases.

6.  ***Verify Implementation.***
    - Run the full verification suite as specified in `agents.md`: `pnpm lint`, `pnpm format:check`, `pnpm test:ci`, and `pnpm build`.

7.  ***Update Project Documentation.***
    - Update `jules.md` with details on the new attribute system.
    - Review and update `agents.md` if necessary.

8.  ***Final Report and Submission.***
    - Create the final report `jules/plan013-report.md`.
    - Request a code review and submit the final changes.
