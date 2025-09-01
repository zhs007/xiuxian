import { describe, it, expect, beforeEach } from 'vitest';
import { Game } from './Game';
import type { CharacterCard, EventCard } from '@/types/Card';
import { CardType } from '@/types/Card';

const mockCharacterCard: CharacterCard = {
  id: 'charCard1',
  name: 'Test Character',
  type: CardType.Character,
  gender: 'male',
  description: '',
  illustration: '',
};

const createMockEventCard = (id: string): EventCard => ({
  id,
  name: `Event ${id}`,
  type: CardType.Event,
  description: '',
  illustration: '',
  options: [
    { description: 'Option A', outcomeId: 'A' },
    { description: 'Option B', outcomeId: 'B' },
  ],
});

const initialEventDeck: EventCard[] = [
  createMockEventCard('e1'),
  createMockEventCard('e2'),
  createMockEventCard('e3'),
];

describe('Game', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  it('should start a new game, creating a player character and setting up the deck', () => {
    game.startNewGame(mockCharacterCard, 'Player', initialEventDeck);

    // Check if player character exists
    const player = game.getPlayerCharacter();
    expect(player).toBeDefined();
    expect(player?.name).toBe('Player');
    expect(player?.baseCard.id).toBe('charCard1');

    // Check if deck is initialized
    const deckSize = game.getDeckManager().getDeckSize();
    expect(deckSize).toBe(initialEventDeck.length);
  });

  it('should draw the next event and set it as the current event', () => {
    game.startNewGame(mockCharacterCard, 'Player', initialEventDeck);
    expect(game.getCurrentEvent()).toBeUndefined();

    const drawnEvent = game.drawNextEvent();
    expect(drawnEvent).toBeDefined();
    expect(drawnEvent?.id).toBe('e1'); // First card in the deck
    expect(game.getCurrentEvent()).toBe(drawnEvent);
    expect(game.getDeckManager().getDeckSize()).toBe(initialEventDeck.length - 1);
  });

  it('should return undefined when drawing after the deck is empty', () => {
    game.startNewGame(mockCharacterCard, 'Player', [createMockEventCard('e1')]);
    game.drawNextEvent(); // Draw the only card
    const nextEvent = game.drawNextEvent();
    expect(nextEvent).toBeUndefined();
    expect(game.getCurrentEvent()).toBeUndefined();
  });

  it('should handle making a choice on the current event', () => {
    game.startNewGame(mockCharacterCard, 'Player', initialEventDeck);
    const event = game.drawNextEvent();
    expect(event).toBeDefined();

    // The 'resolveChoice' method will contain complex logic.
    // For now, we test that it can be called and clears the current event.
    game.resolveChoice(0); // Player chooses the first option

    // After resolving, the current event should be cleared, ready for the next one.
    expect(game.getCurrentEvent()).toBeUndefined();
  });

  it('should throw an error if trying to resolve a choice when no event is active', () => {
    game.startNewGame(mockCharacterCard, 'Player', initialEventDeck);
    expect(() => game.resolveChoice(0)).toThrow('Cannot resolve choice: no current event is active.');
  });

  it('should throw an error if an invalid choice index is provided', () => {
    game.startNewGame(mockCharacterCard, 'Player', initialEventDeck);
    game.drawNextEvent();
    expect(() => game.resolveChoice(2)).toThrow('Invalid choice index: 2');
    expect(() => game.resolveChoice(-1)).toThrow('Invalid choice index: -1');
  });
});
