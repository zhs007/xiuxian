/**
 * @file Implements the central event bus for the game.
 */
import type { GameEvent, GameEventPayloads, GameEventType } from '@/types/Event';

/**
 * A function that handles a dispatched game event.
 */
type Listener<T extends GameEventType> = (event: GameEvent<T>) => void;

/**
 * A function that, when called, unregisters a listener.
 */
export type Unsubscribe = () => void;

/**
 * Manages the registration, unregistration, and dispatching of game-wide events.
 * This system allows for loose coupling between different parts of the game logic.
 */
export class EventListenerSystem {
  private listeners: Map<GameEventType, Set<Listener<any>>> = new Map();

  /**
   * Registers a listener for a specific event type.
   * @param eventType The type of event to listen for.
   * @param listener The function to call when the event is dispatched.
   * @returns An `Unsubscribe` function to remove the listener.
   */
  public on<T extends GameEventType>(eventType: T, listener: Listener<T>): Unsubscribe {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    const listenerSet = this.listeners.get(eventType)!;
    listenerSet.add(listener);

    return () => {
      listenerSet.delete(listener);
      if (listenerSet.size === 0) {
        this.listeners.delete(eventType);
      }
    };
  }

  /**
   * Dispatches an event, calling all registered listeners for its type.
   * @param event The event object to dispatch.
   */
  public dispatch<T extends GameEventType>(event: GameEvent<T>): void {
    const listenerSet = this.listeners.get(event.type);
    if (listenerSet) {
      // Iterate over a copy of the set in case a listener modifies the original set
      [...listenerSet].forEach(listener => listener(event));
    }
  }
}
