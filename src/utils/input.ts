import * as PIXI from 'pixi.js';

export function toDesignPoint(
  event: PointerEvent | Touch | { clientX: number; clientY: number } | any,
  designWidth = 1080,
  designHeight = 1920
): PIXI.Point {
  const canvas = document.querySelector('canvas') as HTMLCanvasElement | null;
  // handle Touch objects
  if ((event as TouchEvent)?.touches && (event as TouchEvent).touches.length > 0) {
    const t = (event as TouchEvent).touches[0] as any;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const designX = (t.clientX - rect.left) * (designWidth / rect.width);
      const designY = (t.clientY - rect.top) * (designHeight / rect.height);
      return new PIXI.Point(designX, designY);
    }
    return new PIXI.Point(t.clientX, t.clientY);
  }

  // pointer/mouse event
  const ev = event as PointerEvent | MouseEvent | any;
  if (ev && ev.clientX != null && ev.clientY != null) {
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const designX = (ev.clientX - rect.left) * (designWidth / rect.width);
      const designY = (ev.clientY - rect.top) * (designHeight / rect.height);
      return new PIXI.Point(designX, designY);
    }
    return new PIXI.Point(ev.clientX, ev.clientY);
  }

  // fallback: if PIXI FederatedPointerEvent or similar passed
  if (ev && ev.global) {
    return new PIXI.Point(ev.global.x, ev.global.y);
  }

  return new PIXI.Point(0, 0);
}

export function annotateEventWithDesign(
  app: PIXI.Application,
  designWidth = 1080,
  designHeight = 1920
): void {
  const annotateEventWithDesign = (e: Event) => {
    const canvas = app.view as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();

    const mapPos = (clientX: number, clientY: number) => {
      // Prefer PIXI interaction manager mapping if available
      try {
        const interaction = (app.renderer as any).plugins?.interaction;
        if (interaction && typeof interaction.mapPositionToPoint === 'function') {
          const p = new PIXI.Point();
          // mapPositionToPoint expects coordinates relative to the canvas; convert client coords to canvas-local first
          const rectLocalX = clientX - rect.left;
          const rectLocalY = clientY - rect.top;
          interaction.mapPositionToPoint(p, rectLocalX, rectLocalY);
          // interaction.mapPositionToPoint maps to renderer coordinates (pixels). Convert to design by dividing by resolution.
          const res = (app.renderer as any).resolution || 1;
          return new PIXI.Point(p.x / res, p.y / res);
        }
      } catch (err) {
        // fallback below
      }
      // fallback: map via bounding rect to design dimensions
      const designX = (clientX - rect.left) * (designWidth / rect.width);
      const designY = (clientY - rect.top) * (designHeight / rect.height);
      return new PIXI.Point(designX, designY);
    };

    if ((e as TouchEvent).touches) {
      const te = e as TouchEvent;
      for (let i = 0; i < te.touches.length; i++) {
        const t = te.touches[i] as any;
        const p = mapPos(t.clientX, t.clientY);
        t.designX = p.x;
        t.designY = p.y;
        t.__designPoint = p;
      }
      for (let i = 0; i < te.changedTouches.length; i++) {
        const t = te.changedTouches[i] as any;
        const p = mapPos(t.clientX, t.clientY);
        t.designX = p.x;
        t.designY = p.y;
        t.__designPoint = p;
      }
      return;
    }

    const ne = e as MouseEvent | PointerEvent | any;
    const p = mapPos(ne.clientX, ne.clientY);
    (ne as any).designX = p.x;
    (ne as any).designY = p.y;
    (ne as any).__designPoint = p;
  };

  const proxyEvents = [
    'pointerdown',
    'pointermove',
    'pointerup',
    'pointercancel',
    'mousedown',
    'mousemove',
    'mouseup',
    'touchstart',
    'touchmove',
    'touchend',
    'touchcancel',
  ];

  proxyEvents.forEach((name) => {
    app.view.addEventListener(name, annotateEventWithDesign, { passive: true });
  });
}
