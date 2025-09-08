/**
 * This file contains static configuration data related to cultivation.
 */

import { CULTIVATION_STAGE_QI_REFINING } from "../constants.js";

/**
 * Defines the maximum experience points required for each minor cultivation stage.
 * The key is the full cultivation stage number (e.g., 1001 for Qi Refining Stage 1).
 * The value is the max XP for that stage.
 */
export const CULTIVATION_XP_CONFIG: Record<number, number> = {
  // Qi Refining (炼气期) - 12 stages
  [CULTIVATION_STAGE_QI_REFINING * 1000 + 1]: 100,
  [CULTIVATION_STAGE_QI_REFINING * 1000 + 2]: 120,
  [CULTIVATION_STAGE_QI_REFINING * 1000 + 3]: 140,
  [CULTIVATION_STAGE_QI_REFINING * 1000 + 4]: 160, // End of Early Stage
  [CULTIVATION_STAGE_QI_REFINING * 1000 + 5]: 200,
  [CULTIVATION_STAGE_QI_REFINING * 1000 + 6]: 220,
  [CULTIVATION_STAGE_QI_REFINING * 1000 + 7]: 240,
  [CULTIVATION_STAGE_QI_REFINING * 1000 + 8]: 260, // End of Mid Stage
  [CULTIVATION_STAGE_QI_REFINING * 1000 + 9]: 300,
  [CULTIVATION_STAGE_QI_REFINING * 1000 + 10]: 330,
  [CULTIVATION_STAGE_QI_REFINING * 1000 + 11]: 360,
  [CULTIVATION_STAGE_QI_REFINING * 1000 + 12]: 400, // End of Late Stage / Bottleneck to next Major Stage
};

// It's also useful to export a function to get the max XP for a given stage.
// This provides a single access point and can handle cases where a stage is not defined.
export function getMaxCultivationXp(stage: number): number | undefined {
  return CULTIVATION_XP_CONFIG[stage];
}
