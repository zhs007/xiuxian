/**
 * @file Defines the base types for all cards in the game.
 */

/**
 * Unique identifier for any card.
 */
export type CardId = string;

/**
 * The four fundamental types of cards.
 */
export enum CardType {
  Character = 'Character',
  Action = 'Action',
  Item = 'Item',
  Event = 'Event',
}

/**
 * Base interface for all cards. Every card in the game has these properties.
 */
export interface Card {
  id: CardId;
  type: CardType;
  name: string;
  description: string;
  /**
   * Path to the card's artwork/image.
   */
  illustration: string;
}

/**
 * Represents a character card. These are used for player characters and NPCs.
 */
export interface CharacterCard extends Card {
  type: CardType.Character;
  gender: 'male' | 'female' | 'other' | 'none';
  // Base attributes are defined on the character instance, not the card,
  // as the card is just a template.
}

/**
 * Represents an option a player can choose on an Event Card.
 */
export interface EventOption {
  /**
   * The text displayed to the player for this option.
   */
  description: string;
  /**
   * The logic to execute when this option is chosen.
   * This might involve checks and lead to different outcomes.
   * Details of its structure will be fleshed out in the logic layer.
   * For now, we can represent it as an ID.
   */
  outcomeId: string;
}

/**
 * Represents an event card, which drives the main gameplay loop.
 * The player is presented with two choices.
 */
export interface EventCard extends Card {
  type: CardType.Event;
  options: [EventOption, EventOption];
}

/**
 * Represents an action card, which puts the game into a specific state or "mode".
 * e.g., Battle, Crafting, Socializing.
 */
export interface ActionCard extends Card {
  type: CardType.Action;
  /**
   * A key identifying the specific action logic to trigger.
   * e.g., "ACTION_BATTLE", "ACTION_ALCHEMY"
   */
  actionKey: string;
}
