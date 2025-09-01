import { describe, it, expect, vi } from 'vitest';
import { DeckManager } from './DeckManager';
import type { EventCard } from '@/types/Card';

// Helper to create mock event cards
const createMockCard = (id: string): EventCard => ({
  id,
  name: `Event ${id}`,
  type: 'Event' as any,
  description: '',
  illustration: '',
  options: [
    { description: 'Option A', outcomeId: 'A' },
    { description: 'Option B', outcomeId: 'B' },
  ],
});

describe('DeckManager', () => {
  it('should be initialized with a set of cards', () => {
    const cards = [createMockCard('c1'), createMockCard('c2')];
    const deckManager = new DeckManager(cards);
    expect(deckManager.getDeckSize()).toBe(2);
  });

  it('should draw a card and reduce the deck size', () => {
    const cards = [createMockCard('c1'), createMockCard('c2')];
    const deckManager = new DeckManager(cards);
    const drawnCard = deckManager.draw();
    expect(drawnCard).toBe(cards[0]); // Draws from the top
    expect(deckManager.getDeckSize()).toBe(1);
  });

  it('should return undefined when drawing from an empty deck', () => {
    const deckManager = new DeckManager([]);
    const drawnCard = deckManager.draw();
    expect(drawnCard).toBeUndefined();
    expect(deckManager.getDeckSize()).toBe(0);
  });

  it('should shuffle the deck', () => {
    const cards = Array.from({ length: 10 }, (_, i) => createMockCard(`c${i}`));
    const deckManager = new DeckManager([...cards]);

    // A simple shuffle check: compare the order before and after.
    // This is not a perfect test for randomness, but it's a good sanity check.
    const originalOrder = cards.map(c => c.id).join('');
    deckManager.shuffle();
    const shuffledOrder = Array.from({ length: 10 }, () => deckManager.draw()?.id).join('');

    expect(originalOrder).not.toBe(shuffledOrder);
    // Note: There's a tiny (1/n!) chance this test could fail with a perfect shuffle
    // that results in the original order. For a 10-card deck, this is negligible.
  });

  describe('Dungeon / Sub-deck functionality', () => {
    it('should push a new deck, making it the active deck', () => {
      const mainDeckCards = [createMockCard('main1')];
      const dungeonDeckCards = [createMockCard('dungeon1'), createMockCard('dungeon2')];
      const deckManager = new DeckManager(mainDeckCards);

      expect(deckManager.getDeckSize()).toBe(1);

      deckManager.pushNewDeck(dungeonDeckCards);
      expect(deckManager.getDeckSize()).toBe(2);

      const drawnCard = deckManager.draw();
      expect(drawnCard?.id).toBe('dungeon1');
      expect(deckManager.getDeckSize()).toBe(1);
    });

    it('should pop a deck and revert to the previous deck', () => {
      const mainDeckCards = [createMockCard('main1')];
      const dungeonDeckCards = [createMockCard('dungeon1')];
      const deckManager = new DeckManager(mainDeckCards);

      deckManager.pushNewDeck(dungeonDeckCards);
      deckManager.draw(); // Draw the dungeon card
      expect(deckManager.getDeckSize()).toBe(0);

      deckManager.popDeck();
      expect(deckManager.getDeckSize()).toBe(1);
      const drawnCard = deckManager.draw();
      expect(drawnCard?.id).toBe('main1');
    });

    it('should handle popping the last deck', () => {
      const deckManager = new DeckManager([createMockCard('c1')]);
      deckManager.popDeck(); // Popping when there's only one deck
      expect(deckManager.getDeckSize()).toBe(1); // Should not remove the base deck
    });

    it('should correctly report the active deck size with multiple levels', () => {
        const deckManager = new DeckManager([createMockCard('c1'), createMockCard('c2')]);
        expect(deckManager.getDeckSize()).toBe(2);
        deckManager.pushNewDeck([createMockCard('d1')]);
        expect(deckManager.getDeckSize()).toBe(1);
        deckManager.pushNewDeck([createMockCard('d2'), createMockCard('d3')]);
        expect(deckManager.getDeckSize()).toBe(2);
        deckManager.popDeck();
        expect(deckManager.getDeckSize()).toBe(1);
        deckManager.popDeck();
        expect(deckManager.getDeckSize()).toBe(2);
    });
  });
});
