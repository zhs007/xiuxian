import * as PIXI from 'pixi.js';

// A type for any scene class that extends PIXI.Container.
// We can extend this with lifecycle methods like init() or destroy() if needed.
export type Scene = new () => PIXI.Container;

/**
 * Manages scene transitions and the application stage.
 */
export class SceneManager {
  private static instance: SceneManager;
  private app: PIXI.Application | null = null;
  private currentScene: PIXI.Container | null = null;

  // Private constructor to enforce singleton pattern.
  private constructor() {}

  /**
   * Gets the singleton instance of the SceneManager.
   */
  public static getInstance(): SceneManager {
    if (!SceneManager.instance) {
      SceneManager.instance = new SceneManager();
    }
    return SceneManager.instance;
  }

  /**
   * Initializes the manager with the PIXI Application instance.
   * @param app - The main PIXI Application.
   */
  public initialize(app: PIXI.Application): void {
    this.app = app;
  }

  /**
   * Switches to a new scene.
   * It removes the current scene, destroys it, and adds the new one to the stage.
   * @param NewScene - The class of the new scene to switch to.
   */
  public switchScene(NewScene: Scene): void {
    if (!this.app) {
      throw new Error('SceneManager not initialized. Call initialize() first.');
    }

    // If there's a current scene, remove and destroy it.
    if (this.currentScene) {
      this.app.stage.removeChild(this.currentScene);
      // The `destroy` method with `{ children: true }` will recursively destroy all children,
      // freeing up textures and removing event listeners. This is crucial for preventing memory leaks.
      this.currentScene.destroy({ children: true });
    }

    // Create and add the new scene.
    this.currentScene = new NewScene();
    this.app.stage.addChild(this.currentScene);
  }
}
