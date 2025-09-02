import * as PIXI from 'pixi.js';
import { MainScene } from './scenes/MainScene';
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
    resolution: window.devicePixelRatio || 1,
    antialias: true,
  });

  // Add the canvas to the DOM.
  document.body.appendChild(app.canvas);

  // Create the start scene.
  let currentScene: PIXI.Container & { update: (delta: number) => void };

  const startScene = new StartScene();
  app.stage.addChild(startScene);
  currentScene = startScene;

  startScene.on('startgame', () => {
    const mainScene = new MainScene();
    app.stage.removeChild(currentScene);
    app.stage.addChild(mainScene);
    currentScene = mainScene;
  });

  /**
   * Resizes the canvas to fit the window while maintaining the aspect ratio.
   */
  const resize = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const scale = Math.min(
      screenWidth / designWidth,
      screenHeight / designHeight
    );

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
    currentScene.update(ticker.deltaMS);
  });
}

void main();
