# Plan for Enhancing CharacterManager

## Goal

The goal is to enhance the `CharacterManager` to specifically track the player's character, ensure there is only one player, and provide a convenient method to retrieve the player's character object.

## Task Decomposition

1.  **Modify `packages/logic-core/src/character-manager.ts`:**
    *   Add a new private property `playerCharacterId` of type `string | null`, initialized to `null`.
    *   Update the `createCharacter` method:
        *   If the new character's type is `PLAYER`, check if `playerCharacterId` is already set.
        *   If it is, throw an error to enforce the "only one player" rule.
        *   If it's not, set `playerCharacterId` to the new character's ID.
    *   Add a new public method `getPlayer(): Character | undefined`:
        *   This method will check if `playerCharacterId` is set.
        *   If it is, it will use the ID to retrieve the character from the `characters` map and return it.
        *   If not, it will return `undefined`.

2.  **Update `packages/logic-core/src/character-manager.test.ts`:**
    *   Add a new test case to verify that `getPlayer()` correctly returns the player character object.
    *   Add a test case to verify that `getPlayer()` returns `undefined` before a player character has been created.
    *   Add a test case to confirm that creating a character of type `PLAYER` sets the internal `playerCharacterId`.
    *   Add a new test case to ensure that calling `createCharacter` with `CharacterType.PLAYER` a second time throws an error.

3.  **Update Documentation:**
    *   Create a new report file `jules/plan010-report.md` to document the implementation process.
    *   Update `jules.md` to include details about the new `getPlayer()` method and the single-player constraint in `CharacterManager`.

4.  **Final Verification:**
    *   Run the full test suite (`pnpm test`) to ensure all existing and new tests pass.
    *   Run all verification scripts specified in `agents.md` (`lint`, `format:check`, `test:ci`, `build`).
