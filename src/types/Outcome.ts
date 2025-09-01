/**
 * @file Defines the data structure for the result of a player's choice.
 */
import type { AttributeKey } from './Attribute';
import type { CardId } from './Card';

/**
 * A change to a single attribute.
 */
export interface AttributeChange {
  key: AttributeKey;
  value: number; // Can be positive or negative
}

/**
 * The direct results of an outcome (e.g., rewards, penalties).
 */
export interface OutcomeResult {
  /**
   * A short description of what happened, to be shown in the event log.
   */
  narration: string;
  attributes?: AttributeChange[];
  itemsGained?: CardId[];
  itemsLost?: CardId[];
  // Could also include actions, e.g., { action: 'start_battle', target: 'npc_goblin' }
}

/**
 * Defines a full outcome, including checks and results for success/failure.
 */
export interface Outcome {
  id: string;
  /**
   * An array of attribute checks to perform on the player.
   * If empty, the success branch is always taken.
   */
  requirements?: {
    attribute: AttributeKey;
    value: number;
  }[];
  success: OutcomeResult;
  failure: OutcomeResult;
}
