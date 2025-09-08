/**
 * This file contains core constants used throughout the game logic.
 * Using constants helps prevent magic strings and numbers, improving maintainability.
 */

// ## Character Attributes
// These are the string keys used to access character attributes in their `attributes` map.
export const ATTR_AGE = "age";
export const ATTR_SPIRIT_STONES = "spirit_stones";
export const ATTR_CULTIVATION_STAGE = "cultivation_stage";
export const ATTR_CULTIVATION_XP = "cultivation_xp";
export const ATTR_CULTIVATION_XP_MAX = "cultivation_xp_max";
export const ATTR_SPIRITUAL_ROOT = "spiritual_root";

// ## Cultivation Stages
// Major stage IDs. The full stage is `MAJOR_STAGE * 1000 + minor_stage`.
export const CULTIVATION_STAGE_MORTAL = 0;
export const CULTIVATION_STAGE_QI_REFINING = 1;
export const CULTIVATION_STAGE_FOUNDATION_ESTABLISHMENT = 2;
export const CULTIVATION_STAGE_CORE_FORMATION = 3;
export const CULTIVATION_STAGE_NASCENT_SOUL = 4;
export const CULTIVATION_STAGE_SPIRIT_TRANSFORMATION = 5;

// ## Spiritual Roots
// Bitmask values for elemental spiritual roots.
export const SPIRITUAL_ROOT_METAL = 1 << 0; // 1
export const SPIRITUAL_ROOT_WOOD = 1 << 1; // 2
export const SPIRITUAL_ROOT_WATER = 1 << 2; // 4
export const SPIRITUAL_ROOT_FIRE = 1 << 3; // 8
export const SPIRITUAL_ROOT_EARTH = 1 << 4; // 16
export const SPIRITUAL_ROOT_VARIANT = 1 << 5; // 32

export const ALL_SPIRITUAL_ROOTS = [
  SPIRITUAL_ROOT_METAL,
  SPIRITUAL_ROOT_WOOD,
  SPIRITUAL_ROOT_WATER,
  SPIRITUAL_ROOT_FIRE,
  SPIRITUAL_ROOT_EARTH,
];

export const SPIRITUAL_ROOT_FIVE_ELEMENTS =
  SPIRITUAL_ROOT_METAL |
  SPIRITUAL_ROOT_WOOD |
  SPIRITUAL_ROOT_WATER |
  SPIRITUAL_ROOT_FIRE |
  SPIRITUAL_ROOT_EARTH;
