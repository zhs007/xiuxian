import * as PIXI from 'pixi.js';
import { StartScreenLogic } from '../game/logic/startScreen';
const designWidth = 1080;
const designHeight = 1920;
/**
 * The start scene of the game.
 * This class is responsible for rendering the start screen, including the logo and buttons.
 * It interacts with the StartScreenLogic to handle user input.
 */
export class StartScene extends PIXI.Container {
    logic;
    constructor() {
        super();
        this.logic = new StartScreenLogic();
        this.initializeUI();
    }
    /**
     * Initializes the user interface of the start screen.
     */
    initializeUI() {
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
        logo.x = designWidth / 2;
        logo.y = designHeight / 4;
        this.addChild(logo);
        // Create "New Game" button
        const newGameButton = this.createButton('New Game', designHeight / 2);
        newGameButton.on('pointerover', () => this.logic.setHoveredButton('new'));
        newGameButton.on('pointerout', () => this.logic.setHoveredButton(null));
        newGameButton.on('pointertap', () => console.log('New Game clicked'));
        this.addChild(newGameButton);
        // Create "Continue Game" button
        const continueButton = this.createButton('Continue Game', designHeight / 2 + 120);
        continueButton.on('pointerover', () => this.logic.setHoveredButton('continue'));
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
    createButton(text, y) {
        const buttonWidth = 400;
        const buttonHeight = 100;
        const button = new PIXI.Graphics();
        button.rect(0, 0, buttonWidth, buttonHeight);
        button.fill(0x1099bb);
        const buttonText = new PIXI.Text({
            text,
            style: {
                fontFamily: 'Arial',
                fontSize: 48,
                fill: 0xffffff,
                align: 'center',
            },
        });
        buttonText.anchor.set(0.5);
        buttonText.x = buttonWidth / 2;
        buttonText.y = buttonHeight / 2;
        button.addChild(buttonText);
        button.x = designWidth / 2 - buttonWidth / 2;
        button.y = y;
        button.eventMode = 'static'; // Make the button interactive
        button.cursor = 'pointer';
        return button;
    }
    /**
     * Updates the scene.
     * @param delta - The time in milliseconds since the last update.
     */
    update(_delta) {
        // This is where you would add your game logic to run on every frame.
        // For now, we don't have any, but we could change button colors on hover here
        // by checking this.logic.hoveredButton.
    }
}
//# sourceMappingURL=StartScene.js.map