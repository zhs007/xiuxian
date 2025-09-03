1.  ***Project Configuration & CI (Issues #7, #8, #12)***
    *   **Task 1.1:** Correct the file paths in `tsconfig.node.json` from `".eslintrc.cjs"` and `"prettier.config.js"` to `"eslint.config.js"` and `".prettierrc"`.
    *   **Task 1.2:** In `package.json`, add a new script `test:ci` with the command `vitest run`.
    *   **Task 1.3:** Create a CI workflow file at `.github/workflows/ci.yml` that runs on push/PR. This workflow will execute `npm install`, `npm run lint`, `npm run test:ci`, and `npm run build`. I will also add a step for `npm audit --audit-level=high` to satisfy the security check recommendation.

2.  ***Core Frontend Architecture (Issues #1, #4, #5)***
    *   **Task 2.1:** Create a new file `src/config.ts` to store shared constants. I will define and export `DESIGN_WIDTH` and `DESIGN_HEIGHT` from this file.
    *   **Task 2.2:** Refactor `src/scenes/StartScene.ts` and `src/scenes/MainScene.ts` to import and use the constants from `src/config.ts`.
    *   **Task 2.3:** Create a `SceneManager.ts` at `src/scenes/SceneManager.ts`. This class will manage the lifecycle of scenes, including adding them to the stage and properly destroying the previous scene upon transition to prevent memory leaks.
    *   **Task 2.4:** Update `src/main.ts` to use the `SceneManager` to handle the transition from `StartScene` to `MainScene`.
    *   **Task 2.5:** In `src/scenes/MainScene.ts`, wrap the `PIXI.Assets.load` call in a `try...catch` block to handle potential loading errors gracefully.

3.  ***Refactor MainScene Logic (Issues #2, #3, #10, #11)***
    *   **Task 3.1:** Create a new logic file `src/game/logic/mainScreen.ts`. I will extract the drag-to-position mapping, rotation calculation, and swipe decision logic from `MainScene` into pure, testable functions within this file.
    *   **Task 3.2:** Create a corresponding test file `src/game/logic/mainScreen.test.ts` and write unit tests for the extracted pure functions.
    *   **Task 3.3:** Refactor `MainScene` to import and use the new logic functions.
    *   **Task 3.4:** In `MainScene`, modify the `flyOut` method to set `this.card.eventMode = 'none'` at the start of the animation and restore it to `'static'` in the `onComplete` callback.
    *   **Task 3.5:** Change the `flyOut`'s `onComplete` callback to use a `gsap` animation for the card's return to the center, instead of instantly resetting its position, to satisfy the smoother animation requirement.
    *   **Task 3.6:** Clean up the "debug removed" and "canceled" comments from `MainScene`.

4.  ***Improve StartScene UI/UX (Issue #6)***
    *   **Task 4.1:** In `src/scenes/StartScene.ts`, modify the `createButton` method. I will add `pointerover` and `pointerout` event listeners to scale the button slightly, providing visual feedback.
    *   **Task 4.2:** Explicitly set a `hitArea` for the button container to ensure the interactive area matches the visual bounds perfectly.

5.  ***Enhance Server Robustness (Issue #9)***
    *   **Task 5.1:** Install the `@fastify/cors` dependency.
    *   **Task 5.2:** In `server/index.ts`, import and register the CORS plugin.
    *   **Task 5.3:** Implement graceful shutdown by listening for `SIGINT` and `SIGTERM` signals to close the server properly.
    *   **Task 5.4:** Modify the `server.listen` call to use `process.env.PORT` and `process.env.HOST` with fallbacks, and bind to `0.0.0.0` to improve container compatibility.

6.  ***Verification and Documentation***
    *   **Task 6.1:** Run all verification checks as specified in `agents.md`: `npm run lint`, `npm run format:check`, `npm run test:ci`, and `npm run build`.
    *   **Task 6.2:** Create the plan document `jules/plan002.md`.
    *   **Task 6.3:** After all code changes are complete, create the final report `jules/plan002-report.md`.
    *   **Task 6.4:** Update `jules.md` with a summary of the architectural changes, problems solved, and design decisions made.
    *   **Task 6.5:** Update `agents.md` to mention the new `SceneManager` and the logic separation for `MainScene`.
