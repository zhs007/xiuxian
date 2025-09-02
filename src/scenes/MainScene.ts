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
  private debugText: PIXI.Text | null = null;

  // Use global helper (window.toDesignPoint) provided by main.ts
  // animation state for smooth return / bounce
  

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

    // Debug overlay: shows tilt/position/pending swipe and last action
    this.debugText = new PIXI.Text('', {
      fill: '#00ff00',
      fontSize: 18,
      fontFamily: 'Arial'
    });
    this.debugText.x = 12;
    this.debugText.y = 12;
    this.addChild(this.debugText);

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
  const origEv = (event as any).originalEvent as any;
  let designPoint: PIXI.Point;
  let src = 'computed';
  if (origEv && (origEv as any).__designPoint) {
    designPoint = (origEv as any).__designPoint;
    src = 'orig.__designPoint';
  } else if ((event as any).__designPoint) {
    designPoint = (event as any).__designPoint;
    src = 'event.__designPoint';
  } else {
    designPoint = (window as any).toDesignPoint(origEv || event);
    src = 'computed';
  }
  // convert to local coordinates of this container
  const localPoint = this.toLocal(designPoint);
  this.dragStart.copyFrom(localPoint);
  if (this.debugText) {
    const txt = `start src:${src} x:${designPoint.x.toFixed(1)} y:${designPoint.y.toFixed(1)}`;
    this.debugText.text = txt;
    console.log(txt);
  }
    // Store the initial position of the card itself.
    this.originalPosition.set(this.card.x, this.card.y);
  };

  // pending swipe direction while dragging; only fire when released
  private pendingSwipe: 'left' | 'right' | null = null;

  private onDragMove = (event: PIXI.FederatedPointerEvent): void => {
    if (this.dragging && this.card) {
  const origEv = (event as any).originalEvent as any;
  let designPoint: PIXI.Point;
  let src = 'computed';
  if (origEv && (origEv as any).__designPoint) {
    designPoint = (origEv as any).__designPoint;
    src = 'orig.__designPoint';
  } else if ((event as any).__designPoint) {
    designPoint = (event as any).__designPoint;
    src = 'event.__designPoint';
  } else {
    designPoint = (window as any).toDesignPoint(origEv || event);
    src = 'computed';
  }
  const currentPoint = this.toLocal(designPoint);
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
  const intendedX = this.originalPosition.x + nonlinear * maxOffset * amplifyFactor;

      // Render clamp: allow the card center to go to the screen edges
      const minX = 0;
      const maxX = designWidth;
      this.card.x = Math.max(minX, Math.min(intendedX, maxX));

  // Rotate the card based on intended horizontal displacement (not clamped)
  const offsetXIntended = intendedX - this.originalPosition.x;
  const maxAngleDeg = 45; // max tilt in degrees (changed to 45°)
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
      if (this.debugText) {
        const txt = `src:${src} t:${t.toFixed(2)} pending:${this.pendingSwipe ?? 'none'} ix:${intendedX.toFixed(0)} x:${this.card.x.toFixed(0)}`;
        this.debugText.text = txt;
        console.log(txt);
      }
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

  // Log at the moment the fly-out starts
  const msg = `Action: Swiped ${direction === 'left' ? 'Left' : 'Right'}`;
  console.log(msg);
  if (this.debugText) this.debugText.text = msg;

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
      ease: 'back.out(1.7)'
    });
    if (this.debugText) this.debugText.text = 'Action: Canceled';
  }

  /**
   * Updates the scene.
   * @param _delta - The time in milliseconds since the last update.
   */
  public update(_delta: number): void {
  // No per-frame animation handling needed; gsap handles tweens.
  }
}
