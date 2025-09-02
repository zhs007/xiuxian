1.  **Setup and Configuration:**
    *   Modify `index.html` to set the `<body>` background color to white.
    *   Update `src/main.ts` to correctly center the Pixi canvas on the page.
    *   Update the Pixi application initialization in `src/main.ts` to enable anti-aliasing (`antialias: true`) and set the resolution to match the device's pixel ratio (`resolution: window.devicePixelRatio || 1`).

2.  **Asset Structure:**
    *   Create the `assets` directory at the project root.
    *   Create the `assets/ui` and `assets/cards` subdirectories.
    *   Create a placeholder file named `card.png` inside `assets/cards`. I will put some placeholder text in it as I cannot generate a real image. I'll note this limitation in the report.

3.  **Scene Management and `MainScene` Creation:**
    *   Create a new file `src/scenes/MainScene.ts`.
    *   Implement the basic structure of the `MainScene` class, extending `PIXI.Container`.
    *   In `src/main.ts`, implement a simple scene management system. This will involve removing the `StartScene` and adding the `MainScene` to the stage when requested.
    *   Modify `src/scenes/StartScene.ts`. The "New Game" button will emit a custom event (e.g., 'startgame').
    *   In `src/main.ts`, listen for the 'startgame' event from the `StartScene` instance to trigger the scene switch.

4.  **Implement `MainScene` Logic:**
    *   In `src/scenes/MainScene.ts`, use `PIXI.Assets.load` to load the `assets/cards/card.png` image.
    *   Create a `PIXI.Sprite` from the loaded texture and add it to the center of the scene.
    *   Implement the drag-and-drop functionality for the card sprite.
        *   Add `pointerdown`, `pointermove`, and `pointerup` event listeners.
        *   On `pointermove`, update the card's position, but constrain it within the horizontal bounds of the screen.
        *   On `pointerup`, check the card's final X position to determine the outcome:
            *   If dragged far left (e.g., `x < designWidth * 0.25`), log "Action: Swiped Left".
            *   If dragged far right (e.g., `x > designWidth * 0.75`), log "Action: Swiped Right".
            *   Otherwise, animate the card back to the center and log "Action: Canceled".

5.  **Documentation:**
    *   Create `jules/plan002.md` with the initial plan.
    *   Update `jules.md` with the new architectural decisions (scene management, asset handling) and any challenges.
    *   Update `agents.md` to mention the new `assets` directory if necessary and potentially add notes about the scene management pattern.

6.  **Verification and Finalization:**
    *   Run the verification steps from `agents.md`: `npm run lint`, `npm run format:check`, `npm run test`, and `npm run build`.
    *   Create `jules/plan002-report.md` to document the entire process.
    *   Request a code review.
    *   Submit the changes.
