import * as PIXI from 'pixi.js';
import { MainScene } from './scenes/MainScene';
import { StartScene } from './scenes/StartScene';
import { SceneManager } from './scenes/SceneManager';
import { DESIGN_WIDTH, DESIGN_HEIGHT } from './config';

/**
 * The main entry point of the game.
 */
async function main() {
  // Create a new Pixi application.
  const app = new PIXI.Application();

  // Initialize the application.
  await app.init({
    width: DESIGN_WIDTH,
    height: DESIGN_HEIGHT,
    backgroundColor: 0x000000,
    resolution: window.devicePixelRatio || 1,
    antialias: true,
  });

  // Add the canvas to the DOM.
  document.body.appendChild(app.canvas);

  // Initialize the SceneManager
  const sceneManager = SceneManager.getInstance();
  sceneManager.initialize(app);

  // Switch to the start scene.
  sceneManager.switchScene(StartScene);

  // Listen for the start game event to switch to the main scene.
  // We can listen on the stage because events bubble up.
  app.stage.on('startgame', () => {
    sceneManager.switchScene(MainScene);
  });

  /**
   * Resizes the canvas to fit the window while maintaining the aspect ratio.
   */
  const resize = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const scale = Math.min(
      screenWidth / DESIGN_WIDTH,
      screenHeight / DESIGN_HEIGHT
    );

    app.renderer.canvas.style.width = `${DESIGN_WIDTH * scale}px`;
    app.renderer.canvas.style.height = `${DESIGN_HEIGHT * scale}px`;
  };

  // Listen for window resize events.
  window.addEventListener('resize', resize);
  // Initial resize.
  resize();

  // The ticker is managed globally by PIXI.Application.
  // Individual scenes can add their own update logic to the ticker if needed,
  // but for now, the `update` methods in the scenes are not hooked up to anything.
  // This simplifies the main loop. If per-frame updates are needed, scenes
  // should add/remove their own ticker functions upon being created/destroyed.
}

void main();
