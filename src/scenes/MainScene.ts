import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
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

  // Pointer handling uses the PIXI federated event global coords.
  // animation state for smooth return / bounce

  constructor() {
    super();
    void this.initialize();
  }

  /**
   * Initializes the scene, loading assets and setting up the UI.
   */
  private async initialize(): Promise<void> {
    // Load the texture via PIXI Assets to ensure it is cached before use
    const texture = await PIXI.Assets.load<PIXI.Texture>(cardImageUrl);
    this.card = new PIXI.Sprite(texture);

    // Pivot slightly above the bottom so tilt feels natural around a lower point
    this.card.anchor.set(0.5, 0.9);
    this.card.x = designWidth / 2;
    this.card.y = designHeight / 2 + 500;

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

  // pending swipe direction while dragging; only fire when released
  private pendingSwipe: 'left' | 'right' | null = null;

  private onDragMove = (event: PIXI.FederatedPointerEvent): void => {
    if (this.dragging && this.card) {
      const currentPoint = event.global;
      // Non-linear lateral mapping for better feel (work in PIXI renderer/design coordinates):
      // - normalize drag delta to [-1,1] using maxOffset
      // - apply a power curve (power < 1 amplifies small inputs)
      // - multiply by maxOffset and an extra amplifyFactor to make displacement more obvious
      const dragDeltaX = currentPoint.x - this.dragStart.x;
      const maxOffset = designWidth / 2;
      const n = Math.max(-1, Math.min(1, dragDeltaX / maxOffset));
      const power = 0.7; // <1 to amplify
      const amplifyFactor = 1.4; // overall strength
      const nonlinear = Math.sign(n) * Math.pow(Math.abs(n), power);
      // Intended (unclamped) center x based on drag mapping
      const intendedX =
        this.originalPosition.x + nonlinear * maxOffset * amplifyFactor;

      // Render clamp: allow the card center to go to the screen edges
      const minX = 0;
      const maxX = designWidth;
      this.card.x = Math.max(minX, Math.min(intendedX, maxX));

      // Rotate the card based on intended horizontal displacement (not clamped)
      const offsetXIntended = intendedX - this.originalPosition.x;
      const maxAngleDeg = 20; // max tilt in degrees
      const maxAngle = (maxAngleDeg * Math.PI) / 180;
      const t = Math.max(-1, Math.min(1, offsetXIntended / maxOffset));
      this.card.rotation = t * maxAngle;

      // Determine pending swipe based on normalized t (rotation influence), not raw x.
      // This allows users to reach a strong tilt without necessarily crossing the x threshold.
      const swipeThreshold = 0.6; // require ~60% tilt to consider a swipe candidate
      if (t <= -swipeThreshold) {
        // candidate left swipe
        if (this.pendingSwipe !== 'left') this.pendingSwipe = 'left';
      } else if (t >= swipeThreshold) {
        // candidate right swipe
        if (this.pendingSwipe !== 'right') this.pendingSwipe = 'right';
      } else {
        // moved back toward center; cancel pending swipe
        this.pendingSwipe = null;
      }
      // update debug overlay
      // Add a subtle vertical follow to make the card feel like it's tethered while dragging
      const dragDeltaY = currentPoint.y - this.dragStart.y;
      const maxYOffset = Math.min(120, designHeight * 0.06); // cap sway to ~6% of screen
      const nY = Math.max(-1, Math.min(1, dragDeltaY / (designHeight / 2)));
      const powerY = 0.7; // gentle non-linearity
      const amplifyY = 1.0; // keep modest
      const nonlinearY = Math.sign(nY) * Math.pow(Math.abs(nY), powerY);
      const intendedY =
        this.originalPosition.y + nonlinearY * maxYOffset * amplifyY;
      const minY = 0;
      const maxY = designHeight;
      this.card.y = Math.max(minY, Math.min(intendedY, maxY));

      // debug logging removed
    }
  };

  private onDragEnd = (): void => {
    if (!this.dragging || !this.card) {
      return;
    }

    this.dragging = false;

    const dragThresholdLeft = designWidth * 0.25;
    const dragThresholdRight = designWidth * 0.75;

    // Prioritize pendingSwipe (based on tilt). Only trigger if pendingSwipe exists when released.
    if (this.pendingSwipe === 'left') {
      this.flyOut('left');
      this.pendingSwipe = null;
    } else if (this.pendingSwipe === 'right') {
      this.flyOut('right');
      this.pendingSwipe = null;
    } else if (this.card.x < dragThresholdLeft) {
      // Fallback: if user physically moved past the x threshold, trigger fly-out
      this.flyOut('left');
    } else if (this.card.x > dragThresholdRight) {
      this.flyOut('right');
    } else {
      // Not far enough: cancel and return center without logging
      this.resetCardPosition();
    }
  };

  private flyOut(direction: 'left' | 'right'): void {
    if (!this.card) return;
    // Ensure no other tweens are running
    gsap.killTweensOf(this.card);

    const offX =
      direction === 'left'
        ? -(this.card.width + 600)
        : designWidth + (this.card.width + 600);
    const offY = this.card.y + (direction === 'left' ? 120 : -120);
    const rot = direction === 'left' ? -Math.PI / 2 : Math.PI / 2;

    // fly-out started

    gsap.to(this.card, {
      x: offX,
      y: offY,
      rotation: rot,
      duration: 0.6,
      ease: 'power2.in',
      onComplete: () => {
        // After flying out, reset the card back to original position and neutral rotation
        if (!this.card) return;
        this.card.x = this.originalPosition.x;
        this.card.y = this.originalPosition.y;
        this.card.rotation = 0;
      },
    });
  }

  private resetCardPosition(): void {
    if (!this.card) return;
    // Use gsap to smoothly return position and rotation with an overshoot.
    gsap.killTweensOf(this.card);
    gsap.to(this.card, {
      x: this.originalPosition.x,
      y: this.originalPosition.y,
      rotation: 0,
      duration: 0.5,
      ease: 'back.out(1.7)',
    });
    // canceled
  }

  /**
   * Updates the scene.
   * @param _delta - The time in milliseconds since the last update.
   */
  public update(_delta: number): void {
    // No per-frame animation handling needed; gsap handles tweens.
  }
}
