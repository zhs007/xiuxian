1.  **Define `CharacterCardData` type:**
    *   In `packages/logic-core/src/types.ts`, I will define a new type `CharacterCardData` as `Map<string, number>`.
    *   I will update the `CardData` interface to use this type for the `data` property when the card type is `CHARACTER`.

2.  **Update `Character` class:**
    *   In `packages/logic-core/src/character.ts`, I will modify the `Character` constructor. It will now accept `name` as a parameter instead of deriving it from the card.
    *   The constructor will check if the card is a `CHARACTER` card and if it has `data`. If so, it will iterate over the `CharacterCardData` and populate the character's `attributes`.

3.  **Update `CharacterManager.createCharacter` method:**
    *   In `packages/logic-core/src/character-manager.ts`, I will change the `createCharacter` method signature to accept `(card: Card, name: string, type: CharacterType)`.
    *   I will pass the `name` to the `Character` constructor.

4.  **Update `Character` and `CharacterManager` tests:**
    *   In `packages/logic-core/src/character.test.ts` and `packages/logic-core/src/character-manager.test.ts`, I will update the tests to reflect the changes in the constructors and methods.
    *   I will add new tests to verify that character attributes are correctly initialized from the character card data.

5.  **Documentation:**
    *   Create a new plan file at `jules/plan011.md` with the content of this plan.
    *   After the implementation is complete, create a report file `jules/plan011-report.md`.
    *   Update `jules.md` to document the new `CharacterCardData` and the updated character creation process.
    *   Review `agents.md` and update it if necessary.

6.  **Verification:**
    *   Run `pnpm lint`, `pnpm format:check`, `pnpm test:ci`, and `pnpm build` to ensure the changes are correct and don't break anything.
