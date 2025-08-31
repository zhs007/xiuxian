/**
 * @file Defines the types for all "Item" cards, which are held by characters.
 */

import { AttributeKey } from './Attribute';
import { Card, CardType } from './Card';

/**
 * An enumeration of all possible Item card subtypes.
 */
export enum ItemCardType {
  Effect = 'Effect',     // Automatically triggers on acquisition
  Function = 'Function',   // Active use consumable (potions, talismans)
  Equipment = 'Equipment', // Passive-effect gear (swords, armor)
  Artifact = 'Artifact',   // Crafting stations (furnaces, cauldrons)
  Gongfa = 'Gongfa',     // Cultivation techniques to be learned
  Skill = 'Skill',       // Abilities learned from Gongfa
  Formation = 'Formation', // Special arrays that can be activated
}

/**
 * Represents a requirement for using or equipping a card.
 * e.g., { attribute: 'strength', value: 50 }
 */
export interface Requirement {
  attribute: AttributeKey;
  value: number;
}

/**
 * Represents a per-turn cost for keeping an item active (e.g., an equipped sword).
 */
export type PerTurnCost = Requirement;

/**
 * Base interface for all item cards.
 */
export interface ItemCard extends Card {
  type: CardType.Item;
  itemType: ItemCardType;
}

/**
 * EffectCard: Automatically triggers when a character receives it.
 * e.g., a blessing (positive effect) or a curse (negative effect).
 */
export interface EffectCard extends ItemCard {
  itemType: ItemCardType.Effect;
  // The effect logic is tied to the card's ID.
}

/**
 * FunctionCard: An active-use item, usually with limited uses.
 * e.g., a healing potion, a one-time attack talisman.
 */
export interface FunctionCard extends ItemCard {
  itemType: ItemCardType.Function;
  uses: number; // Number of times it can be used. 1 for most.
  requirements: Requirement[]; // Requirements to be met to use the card.
}

/**
 * EquipmentCard: Can be equipped by a character to gain passive effects.
 * Consumes resources per turn and has durability.
 */
export interface EquipmentCard extends ItemCard {
  itemType: ItemCardType.Equipment;
  durability: number;
  maxDurability: number;
  requirements: Requirement[]; // Requirements to equip.
  perTurnCosts: PerTurnCost[]; // Costs per turn to keep equipped.
  // The passive effects are tied to listeners defined by the card's ID.
}

/**
 * ArtifactCard: A special type of equipment used for crafting actions.
 * e.g., an Alchemy Furnace.
 */
export interface ArtifactCard extends EquipmentCard {
  itemType: ItemCardType.Artifact;
}

/**
 * GongfaCard: A technique or manual that can be studied to gain skills or attribute bonuses.
 */
export interface GongfaCard extends ItemCard {
  itemType: ItemCardType.Gongfa;
  isComplete: boolean; // true for a full manual, false for a fragment.
  progress: number; // Current study progress, from 0 to 100.
  requirements: Requirement[]; // Requirements to start studying.
}

/**
 * SkillCard: An ability learned from a Gongfa. Has no use limit but requires resources to use.
 */
export interface SkillCard extends ItemCard {
  itemType: ItemCardType.Skill;
  requirements: PerTurnCost[]; // The cost to activate the skill.
}

/**
 * FormationCard: A special card that creates a field effect, possibly used by multiple characters.
 */
export interface FormationCard extends ItemCard {
  itemType: ItemCardType.Formation;
  requirements: PerTurnCost[]; // Cost to activate and maintain the formation.
}

/**
 * A union type representing any possible item card.
 */
export type AnyItemCard =
  | EffectCard
  | FunctionCard
  | EquipmentCard
  | ArtifactCard
  | GongfaCard
  | SkillCard
  | FormationCard;
