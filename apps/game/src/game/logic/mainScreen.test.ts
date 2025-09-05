import { describe, it, expect } from 'vitest';
import {
  calculateCardTransform,
  getSwipeDirection,
  type CardDragState,
} from './mainScreen';

describe('mainScreen logic', () => {
  const designWidth = 1080;
  const designHeight = 1920;

  // Helper to create a default state for dragging
  const createDragState = (
    overrides: Partial<CardDragState>
  ): CardDragState => {
    return {
      dragStartX: designWidth / 2,
      dragStartY: designHeight / 2,
      originalX: designWidth / 2,
      originalY: designHeight / 2,
      currentX: designWidth / 2,
      currentY: designHeight / 2,
      designWidth,
      designHeight,
      ...overrides,
    };
  };

  describe('calculateCardTransform', () => {
    it('should not move the card if drag is at the start position', () => {
      const state = createDragState({});
      const transform = calculateCardTransform(state);
      expect(transform.x).toBe(state.originalX);
      expect(transform.y).toBe(state.originalY);
      expect(transform.rotation).toBe(0);
      expect(transform.tilt).toBe(0);
    });

    it('should move the card to the right when dragged right', () => {
      const state = createDragState({ currentX: designWidth / 2 + 200 });
      const transform = calculateCardTransform(state);
      expect(transform.x).toBeGreaterThan(state.originalX);
      expect(transform.rotation).toBeGreaterThan(0);
      expect(transform.tilt).toBeGreaterThan(0);
    });

    it('should move the card to the left when dragged left', () => {
      const state = createDragState({ currentX: designWidth / 2 - 200 });
      const transform = calculateCardTransform(state);
      expect(transform.x).toBeLessThan(state.originalX);
      expect(transform.rotation).toBeLessThan(0);
      expect(transform.tilt).toBeLessThan(0);
    });

    it('should clamp the card position to the screen edges', () => {
      const state = createDragState({ currentX: designWidth * 2 }); // Drag far right
      const transform = calculateCardTransform(state);
      expect(transform.x).toBe(designWidth);
    });
  });

  describe('getSwipeDirection', () => {
    it('should return "right" for a strong right tilt', () => {
      const direction = getSwipeDirection(designWidth / 2, 0.7, designWidth);
      expect(direction).toBe('right');
    });

    it('should return "left" for a strong left tilt', () => {
      const direction = getSwipeDirection(designWidth / 2, -0.8, designWidth);
      expect(direction).toBe('left');
    });

    it('should return "right" for a right positional swipe (fallback)', () => {
      const direction = getSwipeDirection(designWidth * 0.8, 0.1, designWidth);
      expect(direction).toBe('right');
    });

    it('should return "left" for a left positional swipe (fallback)', () => {
      const direction = getSwipeDirection(designWidth * 0.2, -0.1, designWidth);
      expect(direction).toBe('left');
    });

    it('should return null if there is no decisive swipe', () => {
      const direction = getSwipeDirection(designWidth / 2, 0, designWidth);
      expect(direction).toBeNull();
    });
  });
});
