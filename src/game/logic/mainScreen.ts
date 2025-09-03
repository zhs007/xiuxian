/**
 * Represents the state of a card during a drag operation.
 */
export interface CardDragState {
  /** The starting x and y coordinates of the drag. */
  dragStartX: number;
  dragStartY: number;
  /** The original x and y coordinates of the card before dragging. */
  originalX: number;
  originalY: number;
  /** The current x and y coordinates of the pointer. */
  currentX: number;
  currentY: number;
  /** The width of the screen or design area. */
  designWidth: number;
  /** The height of the screen or design area. */
  designHeight: number;
}

/**
 * Calculates the new position and rotation of a card based on drag input.
 * This function contains the non-linear mapping and tilt logic.
 * @param state - The current drag state of the card.
 * @returns An object with the new x, y, rotation, and normalized tilt.
 */
export function calculateCardTransform(state: CardDragState) {
  // Non-linear lateral mapping for better feel
  const dragDeltaX = state.currentX - state.dragStartX;
  const maxOffset = state.designWidth / 2;
  const n = Math.max(-1, Math.min(1, dragDeltaX / maxOffset));
  const power = 0.7; // <1 to amplify small inputs
  const amplifyFactor = 1.4; // overall strength
  const nonlinear = Math.sign(n) * Math.pow(Math.abs(n), power);
  const intendedX = state.originalX + nonlinear * maxOffset * amplifyFactor;

  // Clamp rendered position to screen edges
  const cardX = Math.max(0, Math.min(intendedX, state.designWidth));

  // Calculate rotation based on the unclamped intended displacement
  const offsetXIntended = intendedX - state.originalX;
  const maxAngleDeg = 20;
  const maxAngleRad = (maxAngleDeg * Math.PI) / 180;
  const tilt = Math.max(-1, Math.min(1, offsetXIntended / maxOffset));
  const rotation = tilt * maxAngleRad;

  // Add a subtle vertical follow to make the card feel tethered
  const dragDeltaY = state.currentY - state.dragStartY;
  const maxYOffset = Math.min(120, state.designHeight * 0.06);
  const nY = Math.max(-1, Math.min(1, dragDeltaY / (state.designHeight / 2)));
  const powerY = 0.7;
  const nonlinearY = Math.sign(nY) * Math.pow(Math.abs(nY), powerY);
  const intendedY = state.originalY + nonlinearY * maxYOffset;
  const cardY = Math.max(0, Math.min(intendedY, state.designHeight));

  return { x: cardX, y: cardY, rotation, tilt };
}

/**
 * Determines if a swipe action should be triggered based on tilt or position.
 * @param currentX - The final x position of the card.
 * @param tilt - The final normalized tilt of the card (from -1 to 1).
 * @param designWidth - The width of the design area.
 * @returns 'left', 'right', or null if no swipe should occur.
 */
export function getSwipeDirection(
  currentX: number,
  tilt: number,
  designWidth: number
): 'left' | 'right' | null {
  const swipeTiltThreshold = 0.6; // Requires a strong tilt
  const dragPositionThreshold = 0.25; // Requires 25% of screen width crossed

  if (tilt <= -swipeTiltThreshold) {
    return 'left';
  }
  if (tilt >= swipeTiltThreshold) {
    return 'right';
  }

  // Fallback to positional check if tilt is not decisive
  if (currentX < designWidth * dragPositionThreshold) {
    return 'left';
  }
  if (currentX > designWidth * (1 - dragPositionThreshold)) {
    return 'right';
  }

  return null;
}
