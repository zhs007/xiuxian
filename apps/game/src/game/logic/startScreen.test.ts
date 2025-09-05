import { describe, it, expect } from 'vitest';
import { StartScreenLogic } from './startScreen';

describe('StartScreenLogic', () => {
  it('should initialize with no button hovered', () => {
    const logic = new StartScreenLogic();
    expect(logic.hoveredButton).toBeNull();
  });

  it('should set the hovered button to "new"', () => {
    const logic = new StartScreenLogic();
    logic.setHoveredButton('new');
    expect(logic.hoveredButton).toBe('new');
  });

  it('should set the hovered button to "continue"', () => {
    const logic = new StartScreenLogic();
    logic.setHoveredButton('continue');
    expect(logic.hoveredButton).toBe('continue');
  });

  it('should clear the hovered button when set to null', () => {
    const logic = new StartScreenLogic();
    logic.setHoveredButton('new');
    logic.setHoveredButton(null);
    expect(logic.hoveredButton).toBeNull();
  });
});
