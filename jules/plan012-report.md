# Plan 012 Report: Refactor Card and Add Rarity

## Execution Summary

The goal of this task was to refactor the `Card` class to hold a reference to `CardData` and to add a `rarity` attribute to cards.

The plan was executed as follows:

1.  **Plan Creation**: A plan was created and saved as `jules/plan012.md`.
2.  **`CardRarity` Enum**: The `CardRarity` enum was added to `packages/logic-core/src/types.ts`.
3.  **`rarity` in `CardData`**: The `rarity` property was added to the `CardData` type union in `packages/logic-core/src/types.ts`.
4.  **`Card` Class Refactor**: The `Card` class in `packages/logic-core/src/card.ts` was refactored to hold a `cardData` object and use getters to expose its properties.
5.  **Test Updates**: The tests were updated to reflect the changes in the `CardData` type.

## Problems and Solutions

During the test phase, an issue was discovered. The `pnpm test` command failed during the `build` step (`tsc`).

-   **Problem**: The TypeScript compiler reported errors in `packages/logic-core/src/character.test.ts` because the `CardData` objects used in the tests were missing the new `rarity` property. My initial plan had only accounted for updating `character-manager.test.ts`.

-   **Solution**: I identified the missing `rarity` properties in `character.test.ts` and updated the `CardData` objects in that file to include `rarity: CardRarity.COMMON`. After this fix, all tests passed successfully.

The implementation is now complete and verified.
