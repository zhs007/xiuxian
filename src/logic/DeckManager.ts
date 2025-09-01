/**
 * @file Manages the game's card decks, including the stack for dungeons.
 */
import type { EventCard } from '@/types/Card';

/**
 * A single deck of cards.
 */
type Deck = EventCard[];

/**
 * Manages the stack of event card decks.
 * This class handles the main game deck and temporary "dungeon" decks.
 * It operates as a stack, where the currently active deck is at the top.
 */
export class DeckManager {
  private deckStack: Deck[] = [];

  /**
   * Initializes the DeckManager with a starting deck of cards.
   * @param initialCards The first set of cards to form the main deck.
   */
  constructor(initialCards: EventCard[]) {
    this.deckStack.push([...initialCards]);
  }

  /**
   * Gets the currently active deck (the one on top of the stack).
   * @returns The active deck, or undefined if the stack is empty.
   */
  private getActiveDeck(): Deck | undefined {
    return this.deckStack[this.deckStack.length - 1];
  }

  /**
   * Shuffles the currently active deck.
   * Uses the Fisher-Yates (aka Knuth) shuffle algorithm.
   */
  public shuffle(): void {
    const deck = this.getActiveDeck();
    if (!deck) return;

    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  /**
   * Draws a single card from the top of the active deck.
   * @returns The drawn card, or undefined if the active deck is empty.
   */
  public draw(): EventCard | undefined {
    const deck = this.getActiveDeck();
    return deck?.shift(); // shift() removes from the beginning (top)
  }

  /**
   * Gets the number of cards in the currently active deck.
   * @returns The size of the active deck.
   */
  public getDeckSize(): number {
    return this.getActiveDeck()?.length ?? 0;
  }

  /**
   * Pushes a new deck of cards onto the stack, making it the active deck.
   * This is used when entering a "dungeon" or special event sequence.
   * @param newCards The array of cards for the new deck.
   */
  public pushNewDeck(newCards: EventCard[]): void {
    this.deckStack.push([...newCards]);
  }

  /**
   * Pops the current deck off the stack, reverting to the previous one.
   * This is used when a "dungeon" or special event sequence ends.
   * It will not pop the last remaining (base) deck.
   */
  public popDeck(): void {
    if (this.deckStack.length > 1) {
      this.deckStack.pop();
    }
  }

  /**
   * Serializes the DeckManager's state to a JSON-compatible object.
   */
  public toJSON() {
    return {
      deckStack: this.deckStack,
    };
  }

  /**
   * Creates a DeckManager instance from a serialized state.
   */
  static fromJSON(data: any): DeckManager {
    const instance = new DeckManager([]); // Create with empty initial deck
    if (data && data.deckStack) {
      instance.deckStack = data.deckStack;
    } else {
      instance.deckStack = []; // Ensure it's empty if data is faulty
    }
    return instance;
  }
}
