/**
 * @file Defines the data structure for a character in the game (player or NPC).
 */

import { Attributes } from './Attribute';
import { CharacterCard, CardId } from './Card';
import { AnyItemCard, EquipmentCard } from './ItemCard';

/**
 * Unique identifier for a character instance.
 */
export type CharacterId = string;

/**
 * Represents a character's inventory of item cards.
 */
export type Inventory = Map<CardId, AnyItemCard>;

/**
 * Represents the set of equipped cards for a character.
 */
export type EquippedItems = Map<CardId, EquipmentCard>;

/**
 * Represents a character in the game. This is a live instance, not a template.
 */
export interface Character {
  id: CharacterId;
  /**
   * The base character card used to create this character.
   */
  baseCard: CharacterCard;
  name: string;
  /**
   * The character's current attributes (HP, Mana, etc.).
   * This is the "live" data that changes during the game.
   */
  attributes: Attributes;
  /**
   * The collection of item cards the character is holding.
   */
  inventory: Inventory;
  /**
   * The items the character currently has equipped.
   * This is a subset of the inventory.
   */
  equippedItems: EquippedItems;
}
