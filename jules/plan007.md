# Plan for Core Logic Implementation

I have understood that the goal of this task is to advance the core logic of the game, which is `logic-core`.

## Goal

The main goal is to implement the card game's core logic, including the card base class, card types, and a card manager that loads card data from configuration files.

## Task Decomposition

1.  **Define Card Types**:
    *   Create a new file `packages/logic-core/src/types.ts`.
    *   In this file, define an enum `CardType` with the values `CHARACTER`, `ACTION`, `EVENT`, and `ITEM`.
    *   Define the basic `CardData` interface.

2.  **Create Card Class**:
    *   Create a new file `packages/logic-core/src/card.ts`.
    *   Implement the `Card` class with the following properties:
        *   `id: string`
        *   `type: CardType`
        *   `name: string`
        *   `description: string`
        *   `image: string`
        *   `data: any`
    *   The constructor will take `CardData` and initialize the properties.

3.  **Create Card Manager**:
    *   Create a new file `packages/logic-core/src/card-manager.ts`.
    *   Implement the `CardManager` class.
    *   It will have a `cards: Map<string, Card>` to store the cards.
    *   It will have a `load(directory: string)` method that:
        *   Reads all files in the given directory.
        *   For each file, parses it as JSON into `CardData`.
        *   Creates a new `Card` instance.
        *   Adds the card to the `cards` map.
    *   It will have a `getCard(id: string): Card | undefined` method.

4.  **Create Sample Card Data**:
    *   Create a directory `apps/game/assets/cards/`.
    *   Create a few sample JSON card data files in this directory (e.g., `character1.json`, `action1.json`).

5.  **Update Entry Point**:
    *   Modify `packages/logic-core/src/index.ts` to export `Card`, `CardManager`, `CardType`, and `CardData`.

6.  **Testing**:
    *   I will add a temporary test script to verify the implementation. I'll create a `test.ts` file in the root of `packages/logic-core` and use `ts-node` to run it. This script will:
        *   Instantiate `CardManager`.
        *   Call `load()` with the sample data directory.
        *   Retrieve a card using `getCard()` and assert its properties are correct.

7.  **Documentation**:
    *   Update `jules.md` with the design of the `logic-core` package.
    *   Create `jules/plan007-report.md` to document the process.
    *   Read `agents.md` and update it if necessary.

I will now set this as the official plan.
