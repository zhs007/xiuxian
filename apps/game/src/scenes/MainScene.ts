import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import cardImageUrl from '../../assets/cards/card.png?url';
import { DESIGN_WIDTH, DESIGN_HEIGHT } from '../config';
import {
  calculateCardTransform,
  getSwipeDirection,
} from '../game/logic/mainScreen';

/**
 * The main scene of the game, where the core gameplay happens.
 */
export class MainScene extends PIXI.Container {
  private card: PIXI.Sprite | null = null;
  private dragging = false;
  private dragStart = new PIXI.Point();
  private originalPosition = new PIXI.Point();
  private currentTilt = 0;

  constructor() {
    super();
    void this.initialize();
  }

  /**
   * Initializes the scene, loading assets and setting up the UI.
   */
  private async initialize(): Promise<void> {
    try {
      // Load the texture via PIXI Assets to ensure it is cached before use
      const texture = await PIXI.Assets.load<PIXI.Texture>(cardImageUrl);
      this.card = new PIXI.Sprite(texture);
    } catch (error) {
      console.error('Failed to load card asset:', error);
      // Optionally, display a placeholder or error message on the screen
      const errorText = new PIXI.Text({
        text: 'Error: Could not load card.',
        style: { fill: 'white', fontSize: 40 },
      });
      errorText.anchor.set(0.5);
      errorText.x = DESIGN_WIDTH / 2;
      errorText.y = DESIGN_HEIGHT / 2;
      this.addChild(errorText);
      return;
    }

    // Pivot slightly above the bottom so tilt feels natural around a lower point
    this.card.anchor.set(0.5, 0.9);
    this.card.x = DESIGN_WIDTH / 2;
    this.card.y = DESIGN_HEIGHT / 2 + 500;

    this.originalPosition.set(this.card.x, this.card.y);

    this.addChild(this.card);

    // debug overlay removed

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
    // cancel any ongoing animation so drag feels responsive
    // kill any gsap tweens on the card so manual drag is immediate
    gsap.killTweensOf(this.card);
    this.dragging = true;
    // Store the initial position of the pointer relative to this container.
    const localPoint = event.global; // PIXI federated event provides global coords
    this.dragStart.copyFrom(localPoint);
    // Store the initial position of the card itself.
    this.originalPosition.set(this.card.x, this.card.y);
  };

  private onDragMove = (event: PIXI.FederatedPointerEvent): void => {
    if (this.dragging && this.card) {
      const transform = calculateCardTransform({
        dragStartX: this.dragStart.x,
        dragStartY: this.dragStart.y,
        originalX: this.originalPosition.x,
        originalY: this.originalPosition.y,
        currentX: event.global.x,
        currentY: event.global.y,
        designWidth: DESIGN_WIDTH,
        designHeight: DESIGN_HEIGHT,
      });

      this.card.x = transform.x;
      this.card.y = transform.y;
      this.card.rotation = transform.rotation;
      this.currentTilt = transform.tilt;
    }
  };

  private onDragEnd = (): void => {
    if (!this.dragging || !this.card) {
      return;
    }
    this.dragging = false;

    const direction = getSwipeDirection(
      this.card.x,
      this.currentTilt,
      DESIGN_WIDTH
    );

    if (direction) {
      this.flyOut(direction);
    } else {
      this.resetCardPosition();
    }
  };

  private flyOut(direction: 'left' | 'right'): void {
    if (!this.card) return;

    // Disable input during the animation to prevent conflicts.
    this.card.eventMode = 'none';
    gsap.killTweensOf(this.card);

    const offX =
      direction === 'left'
        ? -(this.card.width + 600)
        : DESIGN_WIDTH + (this.card.width + 600);
    const offY = this.card.y + (direction === 'left' ? 120 : -120);
    const rot = direction === 'left' ? -Math.PI / 2 : Math.PI / 2;

    gsap.to(this.card, {
      x: offX,
      y: offY,
      rotation: rot,
      duration: 0.6,
      ease: 'power2.in',
      onComplete: () => {
        // After flying out, animate the card back to the center.
        this.resetCardPosition(true); // `isNewCard` = true
      },
    });
  }

  private resetCardPosition(isNewCard = false): void {
    if (!this.card) return;

    gsap.killTweensOf(this.card);

    // If it's a "new" card appearing after a swipe,
    // it should start transparent and off-screen, then animate in.
    if (isNewCard) {
      this.card.alpha = 0;
      this.card.x = this.originalPosition.x;
      this.card.y = this.originalPosition.y + DESIGN_HEIGHT; // Start from bottom
      this.card.rotation = 0;
    }

    gsap.to(this.card, {
      x: this.originalPosition.x,
      y: this.originalPosition.y,
      rotation: 0,
      alpha: 1,
      duration: 0.5,
      ease: isNewCard ? 'power2.out' : 'back.out(1.7)',
      onComplete: () => {
        // Re-enable input once the animation is complete.
        if (this.card) {
          this.card.eventMode = 'static';
        }
      },
    });
  }

  /**
   * Updates the scene.
   */
  public update(): void {
    // No per-frame animation handling needed; gsap handles tweens.
  }
}
