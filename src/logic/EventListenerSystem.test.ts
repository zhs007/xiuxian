import { describe, it, expect, vi } from 'vitest';
import { EventListenerSystem } from './EventListenerSystem';
import { GameEventType } from '@/types/Event';
import type { GameEvent, AttributeChangePayload } from '@/types/Event';

describe('EventListenerSystem', () => {
  it('should create an instance without errors', () => {
    expect(() => new EventListenerSystem()).not.toThrow();
  });

  it('should register a listener and call it when the corresponding event is dispatched', () => {
    const system = new EventListenerSystem();
    const listener = vi.fn();
    const eventType = GameEventType.AttributeDidChange;
    const payload: AttributeChangePayload = {
      targetCharacterId: 'char1',
      attribute: 'hp',
      from: 100,
      to: 90,
    };

    system.on(eventType, listener);
    system.dispatch({ type: eventType, payload });

    expect(listener).toHaveBeenCalledOnce();
    expect(listener).toHaveBeenCalledWith({ type: eventType, payload });
  });

  it('should not call a listener for a different event type', () => {
    const system = new EventListenerSystem();
    const listener = vi.fn();

    system.on(GameEventType.AttributeDidChange, listener);
    system.dispatch({ type: GameEventType.ItemWasGained, payload: { characterId: 'char1', item: {} as any } });

    expect(listener).not.toHaveBeenCalled();
  });

  it('should call multiple listeners for the same event', () => {
    const system = new EventListenerSystem();
    const listener1 = vi.fn();
    const listener2 = vi.fn();
    const eventType = GameEventType.AttributeDidChange;
    const payload: AttributeChangePayload = {
      targetCharacterId: 'char1',
      attribute: 'hp',
      from: 100,
      to: 90,
    };

    system.on(eventType, listener1);
    system.on(eventType, listener2);
    system.dispatch({ type: eventType, payload });

    expect(listener1).toHaveBeenCalledOnce();
    expect(listener2).toHaveBeenCalledOnce();
  });

  it('should unregister a listener and not call it anymore', () => {
    const system = new EventListenerSystem();
    const listener = vi.fn();
    const eventType = GameEventType.AttributeDidChange;
    const payload: AttributeChangePayload = {
      targetCharacterId: 'char1',
      attribute: 'hp',
      from: 100,
      to: 90,
    };

    const unsubscribe = system.on(eventType, listener);

    // First dispatch, should be called
    system.dispatch({ type: eventType, payload });
    expect(listener).toHaveBeenCalledOnce();

    // Unsubscribe and dispatch again
    unsubscribe();
    system.dispatch({ type: eventType, payload });

    // Should not be called a second time
    expect(listener).toHaveBeenCalledOnce();
  });

  it('should handle unregistering one of multiple listeners correctly', () => {
    const system = new EventListenerSystem();
    const listener1 = vi.fn();
    const listener2 = vi.fn();
    const eventType = GameEventType.AttributeDidChange;

    system.on(eventType, listener1);
    const unsubscribe2 = system.on(eventType, listener2);

    unsubscribe2();
    system.dispatch({ type: eventType, payload: {} as any });

    expect(listener1).toHaveBeenCalledOnce();
    expect(listener2).not.toHaveBeenCalled();
  });
});
