import * as PIXI from 'pixi.js';
import cardImageUrl from '../../assets/cards/card.png?url';

const designWidth = 1080;
const designHeight = 1920;

/**
 * The main scene of the game, where the core gameplay happens.
 */
export class MainScene extends PIXI.Container {
  private card: PIXI.Sprite | null = null;
  private dragging = false;
  private dragStart = new PIXI.Point();
  private originalPosition = new PIXI.Point();

  constructor() {
    super();
    void this.initialize();
  }

  /**
   * Initializes the scene, loading assets and setting up the UI.
   */
  private async initialize(): Promise<void> {
    const texture = await PIXI.Assets.load(cardImageUrl);
    this.card = new PIXI.Sprite(texture);

    this.card.anchor.set(0.5);
    this.card.x = designWidth / 2;
    this.card.y = designHeight / 2;

    this.originalPosition.set(this.card.x, this.card.y);

    this.addChild(this.card);

    this.card.eventMode = 'static';
    this.card.cursor = 'pointer';

    this.card
      .on('pointerdown', this.onDragStart)
      .on('pointerup', this.onDragEnd)
      .on('pointerupoutside', this.onDragEnd)
      .on('pointermove', this.onDragMove);
  }

  private onDragStart = (event: PIXI.FederatedPointerEvent): void => {
    if (!this.card) return;
    this.dragging = true;
    // Store the initial position of the pointer relative to this container.
    this.dragStart.copyFrom(this.toLocal(event.global));
    // Store the initial position of the card itself.
    this.originalPosition.set(this.card.x, this.card.y);
  };

  private onDragMove = (event: PIXI.FederatedPointerEvent): void => {
    if (this.dragging && this.card) {
      const currentPoint = this.toLocal(event.global);
      const newX =
        this.originalPosition.x + (currentPoint.x - this.dragStart.x);

      // Constrain the card within the screen bounds.
      const cardHalfWidth = this.card.width / 2;
      const minX = cardHalfWidth;
      const maxX = designWidth - cardHalfWidth;

      this.card.x = Math.max(minX, Math.min(newX, maxX));
    }
  };

  private onDragEnd = (): void => {
    if (!this.dragging || !this.card) {
      return;
    }

    this.dragging = false;

    const dragThresholdLeft = designWidth * 0.25;
    const dragThresholdRight = designWidth * 0.75;

    if (this.card.x < dragThresholdLeft) {
      console.log('Action: Swiped Left');
      // In a real game, you might remove the card or animate it off-screen.
      // For now, we just reset it.
      this.resetCardPosition();
    } else if (this.card.x > dragThresholdRight) {
      console.log('Action: Swiped Right');
      this.resetCardPosition();
    } else {
      console.log('Action: Canceled');
      // Animate back to center
      this.resetCardPosition();
    }
  };

  private resetCardPosition(): void {
    if (this.card) {
      // In a real implementation, this would be a smooth animation (e.g., using a tweening library).
      // For this task, an instant reset is sufficient.
      this.card.x = this.originalPosition.x;
      this.card.y = this.originalPosition.y;
    }
  }

  /**
   * Updates the scene.
   * @param _delta - The time in milliseconds since the last update.
   */
  public update(_delta: number): void {
    // Game logic for the main scene.
  }
}
