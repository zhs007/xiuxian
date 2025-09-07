# Plan 012: Refactor Card and Add Rarity

## 1. Goal

The user wants to refactor the `Card` class to hold a reference to `CardData` instead of copying all its properties. Additionally, a `rarity` concept needs to be added to `CardData`.

## 2. Task Breakdown

1.  **Create Plan File**: Create `jules/plan012.md` to document the plan.
2.  **Define `CardRarity` enum**: In `packages/logic-core/src/types.ts`, create a `CardRarity` enum with the following values:
    - `Common`
    - `Rare`
    - `Epic`
    - `Legendary`
3.  **Add `rarity` to `CardData`**: In `packages/logic-core/src/types.ts`, add a mandatory `rarity: CardRarity` field to each type within the `CardData` discriminated union.
4.  **Refactor `Card` class**: In `packages/logic-core/src/card.ts`, modify the `Card` class to:
    - Have a single `public readonly cardData: CardData` property in the constructor.
    - Remove the duplicated properties (`id`, `type`, `name`, `description`, `image`, `data`).
    - Implement getters for these properties that retrieve the values from the `cardData` object.
5.  **Update `character-manager.test.ts`**: Modify the test to include the new `rarity` property in the `CardData` object to ensure tests pass.
6.  **Create Report File**: After implementation, create `jules/plan012-report.md` to document the process.
7.  **Update `jules.md`**: Update the main development documentation file with details about the changes.
8.  **Update `agents.md`**: Review and update `agents.md` if the changes are relevant for future agent work.
