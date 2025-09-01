/**
 * @file Main class for handling all Pixi.js rendering.
 */
import { Application, Container, Text } from 'pixi.js';
import type { Game } from '@/logic/Game';

export class Renderer {
  public app: Application;
  private game: Game;

  // Layers for organizing content
  private backgroundLayer: Container;
  private gameLayer: Container;
  private uiLayer: Container;

  constructor(game: Game) {
    this.game = game;

    // 1. Create Pixi.js Application
    this.app = new Application();

    // 2. Create Layers
    this.backgroundLayer = new Container();
    this.gameLayer = new Container();
    this.uiLayer = new Container();
  }

  /**
   * Initializes the Pixi.js application and appends it to the DOM.
   * @param container - The HTML element to append the canvas to.
   */
  public async init(container: HTMLElement): Promise<void> {
    await this.app.init({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x05080a, // A dark blue/black background
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    // Add layers to the stage
    this.app.stage.addChild(this.backgroundLayer, this.gameLayer, this.uiLayer);

    // Append the view to the DOM
    container.appendChild(this.app.view);

    // Handle window resizing
    window.addEventListener('resize', () => this.onResize());

    // Initial render
    this.draw();
  }

  /**
   * Handles window resize events.
   */
  private onResize(): void {
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
    // Re-draw or re-position elements as needed
    this.draw();
  }

  /**
   * The main drawing loop, called to update the view based on game state.
   */
  public draw(): void {
    // Clear previous drawings if necessary (though often we just update positions)
    this.gameLayer.removeChildren();
    this.uiLayer.removeChildren();

    // TODO: Draw UI elements (placeholders for now)
    this.drawUIPlaceholders();

    // Draw the current event card
    const currentEvent = this.game.getCurrentEvent();
    if (currentEvent) {
      this.drawEventCard(currentEvent);
    }
  }

  private drawEventCard(cardData: Card): void {
    const card = new CardComponent(cardData);
    card.x = (this.app.screen.width - card.width) / 2;
    card.y = (this.app.screen.height - card.height) / 2;

    // Make the card interactive
    card.eventMode = 'static';
    card.cursor = 'pointer';

    // Add drag and drop functionality
    let dragging = false;
    let dragStartPoint: { x: number; y: number } | null = null;

    card.on('pointerdown', (event) => {
      dragging = true;
      dragStartPoint = { x: event.global.x - card.x, y: event.global.y - card.y };
      this.app.stage.on('pointermove', onDragMove);
    });

    const choiceTextStyle = { fontFamily: 'Arial', fontSize: 24, fill: '#ffffff', align: 'center' } as const;
    const choiceTextLeft = new Text({ text: cardData.options[0].description, style: choiceTextStyle });
    const choiceTextRight = new Text({ text: cardData.options[1].description, style: choiceTextStyle });
    choiceTextLeft.anchor.set(0.5);
    choiceTextRight.anchor.set(0.5);
    choiceTextLeft.x = this.app.screen.width / 4;
    choiceTextRight.x = this.app.screen.width * 3 / 4;
    choiceTextLeft.y = choiceTextRight.y = this.app.screen.height / 2;
    choiceTextLeft.visible = choiceTextRight.visible = false;
    this.uiLayer.addChild(choiceTextLeft, choiceTextRight);

    card.on('pointerdown', (event) => {
      dragging = true;
      dragStartPoint = { x: event.global.x - card.x, y: event.global.y - card.y };
      this.app.stage.on('pointermove', onDragMove);
      choiceTextLeft.visible = choiceTextRight.visible = true;
    });

    const onDragMove = (event: any) => {
      if (dragging && dragStartPoint) {
        card.x = event.global.x - dragStartPoint.x;
        card.y = event.global.y - dragStartPoint.y;

        const dragDistance = card.x - (this.app.screen.width - card.width) / 2;
        const choiceThreshold = this.app.screen.width / 5;

        choiceTextLeft.alpha = Math.max(0.2, Math.min(1, -dragDistance / choiceThreshold));
        choiceTextRight.alpha = Math.max(0.2, Math.min(1, dragDistance / choiceThreshold));
      }
    };

    const onDragEnd = () => {
      if (!dragging) return;

      // Always remove the choice text when the drag ends
      this.uiLayer.removeChild(choiceTextLeft, choiceTextRight);

      const dragDistance = card.x - (this.app.screen.width - card.width) / 2;
      const choiceThreshold = this.app.screen.width / 4;
      let choiceMade: (0 | 1) | null = null;

      if (dragDistance < -choiceThreshold) {
        choiceMade = 0; // Left choice
      } else if (dragDistance > choiceThreshold) {
        choiceMade = 1; // Right choice
      }

      // Reset state
      dragging = false;
      dragStartPoint = null;
      this.app.stage.off('pointermove', onDragMove);

      if (choiceMade !== null) {
        // A choice was made
        this.game.resolveChoice(choiceMade);
        this.game.drawNextEvent();
        this.draw(); // Redraw the whole scene for the next event
      } else {
        // No choice made, snap back to center
        card.x = (this.app.screen.width - card.width) / 2;
        card.y = (this.app.screen.height - card.height) / 2;
      }
    };

    card.on('pointerup', onDragEnd);
    card.on('pointerupoutside', onDragEnd);

    this.gameLayer.addChild(card);
  }

  private drawUIPlaceholders(): void {
    const player = this.game.getPlayerCharacter();
    if (!player) return;

    const hp = this.game.getCharacterManager().getAttribute(player.id, 'hp');
    const inventorySize = player.inventory.size;

    const statsStyle = { fontFamily: 'Arial', fontSize: 18, fill: '#ffffff' };
    const statsText = new Text({ text: `HP: ${hp} | Items: ${inventorySize}`, style: statsStyle });
    statsText.x = 10;
    statsText.y = 10;

    this.uiLayer.addChild(statsText);
  }
}
