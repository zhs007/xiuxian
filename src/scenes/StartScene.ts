import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { StartScreenLogic } from '../game/logic/startScreen';
import { DESIGN_WIDTH, DESIGN_HEIGHT } from '../config';

/**
 * The start scene of the game.
 * This class is responsible for rendering the start screen, including the logo and buttons.
 * It interacts with the StartScreenLogic to handle user input.
 */
export class StartScene extends PIXI.Container {
  private logic: StartScreenLogic;

  constructor() {
    super();
    this.logic = new StartScreenLogic();
    this.initializeUI();
  }

  /**
   * Initializes the user interface of the start screen.
   */
  private initializeUI(): void {
    // Create a placeholder logo
    const logo = new PIXI.Text({
      text: 'My Awesome Game',
      style: {
        fontFamily: 'Arial',
        fontSize: 100,
        fill: 0xffffff,
        align: 'center',
      },
    });
    logo.anchor.set(0.5);
    logo.x = DESIGN_WIDTH / 2;
    logo.y = DESIGN_HEIGHT / 4;
    this.addChild(logo);

    // Create "New Game" button
    const newGameButton = this.createButton('New Game', DESIGN_HEIGHT / 2);
    newGameButton.on('pointerover', () => this.logic.setHoveredButton('new'));
    newGameButton.on('pointerout', () => this.logic.setHoveredButton(null));
    newGameButton.on('pointertap', () => this.emit('startgame'));
    this.addChild(newGameButton);

    // Create "Continue Game" button
    const continueButton = this.createButton(
      'Continue Game',
      DESIGN_HEIGHT / 2 + 120
    );
    continueButton.on('pointerover', () =>
      this.logic.setHoveredButton('continue')
    );
    continueButton.on('pointerout', () => this.logic.setHoveredButton(null));
    continueButton.on('pointertap', () => console.log('Continue Game clicked'));
    this.addChild(continueButton);
  }

  /**
   * Creates a button with the given text and y position.
   * @param text - The text to display on the button.
   * @param y - The y position of the button.
   * @returns The created button graphics object.
   */
  private createButton(text: string, y: number): PIXI.Container {
    const buttonWidth = 400;
    const buttonHeight = 100;

    const container = new PIXI.Container();
    container.x = DESIGN_WIDTH / 2;
    container.y = y;
    container.pivot.set(buttonWidth / 2, buttonHeight / 2);

    const graphics = new PIXI.Graphics();
    graphics.beginFill(0x1099bb);
    graphics.drawRect(0, 0, buttonWidth, buttonHeight);
    graphics.endFill();

    const buttonText = new PIXI.Text(text, {
      fontFamily: 'Arial',
      fontSize: 48,
      fill: 0xffffff,
      align: 'center',
    });
    buttonText.anchor.set(0.5);
    buttonText.x = buttonWidth / 2;
    buttonText.y = buttonHeight / 2;

    container.addChild(graphics);
    container.addChild(buttonText);

    // Set the interactive area to the button's dimensions for accurate hit detection.
    container.hitArea = new PIXI.Rectangle(0, 0, buttonWidth, buttonHeight);
    container.eventMode = 'static';
    container.cursor = 'pointer';

    // Add visual feedback for hover and press states.
    container.on('pointerover', () => {
      gsap.to(container.scale, { x: 1.05, y: 1.05, duration: 0.2 });
    });
    container.on('pointerout', () => {
      gsap.to(container.scale, { x: 1, y: 1, duration: 0.2 });
    });
    container.on('pointerdown', () => {
      gsap.to(container.scale, { x: 0.95, y: 0.95, duration: 0.1 });
    });
    container.on('pointerup', () => {
      gsap.to(container.scale, { x: 1.05, y: 1.05, duration: 0.1 });
    });
    container.on('pointerupoutside', () => {
      gsap.to(container.scale, { x: 1, y: 1, duration: 0.2 });
    });

    return container;
  }

  /**
   * Updates the scene.
   * @param delta - The time in milliseconds since the last update.
   */
  public update(_delta: number): void {
    // This is where you would add your game logic to run on every frame.
    // For now, we don't have any, but we could change button colors on hover here
    // by checking this.logic.hoveredButton.
  }
}
