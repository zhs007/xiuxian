import * as PIXI from 'pixi.js';
import { StartScene } from './scenes/StartScene';
const designWidth = 1080;
const designHeight = 1920;
/**
 * The main entry point of the game.
 */
async function main() {
    // Create a new Pixi application.
    const app = new PIXI.Application();
    // Initialize the application.
    await app.init({
        width: designWidth,
        height: designHeight,
        backgroundColor: 0x000000,
        resolution: 1,
    });
    // Add the canvas to the DOM.
    document.body.appendChild(app.canvas);
    // Create the start scene.
    const startScene = new StartScene();
    app.stage.addChild(startScene);
    /**
     * Resizes the canvas to fit the window while maintaining the aspect ratio.
     */
    const resize = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const scale = Math.min(screenWidth / designWidth, screenHeight / designHeight);
        app.renderer.canvas.style.width = `${designWidth * scale}px`;
        app.renderer.canvas.style.height = `${designHeight * scale}px`;
    };
    // Listen for window resize events.
    window.addEventListener('resize', resize);
    // Initial resize.
    resize();
    // Start the game loop.
    app.ticker.add((ticker) => {
        // The time elapsed since the last frame, in milliseconds.
        // PIXI.Ticker is now based on MS, not frames.
        startScene.update(ticker.deltaMS);
    });
}
void main();
//# sourceMappingURL=main.js.map