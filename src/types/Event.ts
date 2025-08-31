/**
 * @file Defines the types for the game's event listener system.
 */

import { AttributeKey } from './Attribute';
import { CardId } from './Card';
import { CharacterId } from './Character';
import { AnyItemCard } from './ItemCard';

/**
 * An enumeration of all possible game events that can be listened to.
 */
export enum GameEventType {
  // Attribute-related events
  AttributeWillChange = 'AttributeWillChange',
  AttributeDidChange = 'AttributeDidChange',

  // Item-related events
  ItemWillBeUsed = 'ItemWillBeUsed',
  ItemWasUsed = 'ItemWasUsed',
  ItemWasGained = 'ItemWasGained',
  ItemWasLost = 'ItemWasLost',
  ItemWasEquipped = 'ItemWasEquipped',
  ItemWasUnequipped = 'ItemWasUnequipped',
}

// --- Event Payloads ---

export interface AttributeChangePayload {
  targetCharacterId: CharacterId;
  attribute: AttributeKey;
  from: number;
  to: number;
}

export interface ItemUsagePayload {
  sourceCharacterId: CharacterId;
  item: AnyItemCard;
}

export interface ItemTransferPayload {
  characterId: CharacterId;
  item: AnyItemCard;
}

export interface ItemEquipmentPayload {
  characterId: CharacterId;
  item: AnyItemCard;
}

/**
 * A map defining the payload type for each event type.
 * This allows for strong typing in the event listener system.
 */
export type GameEventPayloads = {
  [GameEventType.AttributeWillChange]: AttributeChangePayload;
  [GameEventType.AttributeDidChange]: AttributeChangePayload;
  [GameEventType.ItemWillBeUsed]: ItemUsagePayload;
  [GameEventType.ItemWasUsed]: ItemUsagePayload;
  [GameEventType.ItemWasGained]: ItemTransferPayload;
  [GameEventType.ItemWasLost]: ItemTransferPayload;
  [GameEventType.ItemWasEquipped]: ItemEquipmentPayload;
  [GameEventType.ItemWasUnequipped]: ItemEquipmentPayload;
};

/**
 * Represents a generic game event that is passed to listeners.
 */
export interface GameEvent<T extends GameEventType> {
  type: T;
  payload: GameEventPayloads[T];
}
