import { describe, it, expect } from 'vitest';
import { Game } from './Game';
import type { CharacterCard, EventCard } from '@/types/Card';
import { CardType } from '@/types/Card';

const mockCharacterCard: CharacterCard = {
  id: 'charCard1', name: 'Test Character', type: CardType.Character, gender: 'male', description: '', illustration: '',
};

const mockEventDeck: EventCard[] = [
  { id: 'e1', name: 'Event 1', type: CardType.Event, description: '', illustration: '', options: [{d: 'A', o: 'A'},{d: 'B', o: 'B'}] as any },
  { id: 'e2', name: 'Event 2', type: CardType.Event, description: '', illustration: '', options: [{d: 'A', o: 'A'},{d: 'B', o: 'B'}] as any },
];

describe('Save and Load Functionality', () => {
  it('should save the game state and load it into a new game instance, preserving the state', () => {
    // 1. Setup and perform actions on the first game instance
    const game1 = new Game();
    game1.startNewGame(mockCharacterCard, 'Player1', mockEventDeck);
    const player1 = game1.getPlayerCharacter()!;
    game1.getCharacterManager().setAttribute(player1.id, 'hp', 90);
    game1.drawNextEvent(); // Draw e1

    // 2. Save the state
    const savedState = game1.saveState();
    expect(savedState).toBeTypeOf('string');

    // 3. Create a second game instance and load the state
    const game2 = new Game();
    game2.loadState(savedState);

    // 4. Verify the state of the second game instance matches the first
    const player2 = game2.getPlayerCharacter()!;
    expect(player2).toBeDefined();
    expect(player2.name).toBe('Player1');
    expect(game2.getCharacterManager().getAttribute(player2.id, 'hp')).toBe(90);

    // Verify deck state
    expect(game2.getDeckManager().getDeckSize()).toBe(1); // One card was drawn in game1

    // Verify current event
    const currentEvent1 = game1.getCurrentEvent();
    const currentEvent2 = game2.getCurrentEvent();
    expect(currentEvent2).toBeDefined();
    expect(currentEvent2?.id).toBe(currentEvent1?.id);
  });

  it('should handle saving and loading an empty/initial game state', () => {
    const game1 = new Game();
    const savedState = game1.saveState();

    const game2 = new Game();
    game2.loadState(savedState);

    expect(game2.getPlayerCharacter()).toBeUndefined();
    expect(() => game2.getDeckManager()).toThrow();
  });
});
