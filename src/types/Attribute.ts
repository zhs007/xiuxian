/**
 * @file Defines the types for the character attribute system.
 */

/**
 * A unique identifier for an attribute, e.g., "hp", "mana", "strength".
 */
export type AttributeKey = string;

/**
 * Represents the collection of attributes for a character.
 * It's a map where keys are attribute identifiers and values are numbers.
 * This flexible structure allows for dynamic addition of new attributes during gameplay.
 *
 * @example
 * const attributes: Attributes = new Map([
 *   ["hp", 100],
 *   ["mana_max", 500],
 *   ["fire_resistance", 25]
 * ]);
 */
export type Attributes = Map<AttributeKey, number>;
