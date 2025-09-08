import {
  CULTIVATION_STAGE_CORE_FORMATION,
  CULTIVATION_STAGE_FOUNDATION_ESTABLISHMENT,
  CULTIVATION_STAGE_MORTAL,
  CULTIVATION_STAGE_NASCENT_SOUL,
  CULTIVATION_STAGE_QI_REFINING,
  CULTIVATION_STAGE_SPIRIT_TRANSFORMATION,
} from "../constants.js";

const STAGE_NAMES: Record<number, string> = {
  [CULTIVATION_STAGE_MORTAL]: "凡人",
  [CULTIVATION_STAGE_QI_REFINING]: "炼气",
  [CULTIVATION_STAGE_FOUNDATION_ESTABLISHMENT]: "筑基",
  [CULTIVATION_STAGE_CORE_FORMATION]: "结丹",
  [CULTIVATION_STAGE_NASCENT_SOUL]: "元婴",
  [CULTIVATION_STAGE_SPIRIT_TRANSFORMATION]: "化神",
};

const TIER_NAMES = ["初期", "中期", "后期"];

/**
 * Generates a human-readable string for a character's cultivation stage.
 * @param stage The numeric cultivation stage (e.g., 1001).
 * @param maxXP The max XP for the current stage.
 * @param currentXP The current XP.
 * @returns A descriptive string (e.g., "炼气初期 1 阶", "筑基后期 9 阶 瓶颈").
 */
export function getReadableCultivationStage(
  stage: number,
  maxXP: number,
  currentXP: number,
): string {
  if (stage === CULTIVATION_STAGE_MORTAL) {
    return STAGE_NAMES[CULTIVATION_STAGE_MORTAL];
  }

  const majorStage = Math.floor(stage / 1000);
  const minorStage = stage % 1000;

  const majorStageName = STAGE_NAMES[majorStage] ?? "未知";

  let tierName = "";
  if (majorStage === CULTIVATION_STAGE_QI_REFINING) {
    // 炼气 has 12 stages, 4 per tier
    if (minorStage <= 4) tierName = TIER_NAMES[0];
    else if (minorStage <= 8) tierName = TIER_NAMES[1];
    else tierName = TIER_NAMES[2];
  } else {
    // Other stages have 9 stages, 3 per tier
    if (minorStage <= 3) tierName = TIER_NAMES[0];
    else if (minorStage <= 6) tierName = TIER_NAMES[1];
    else tierName = TIER_NAMES[2];
  }

  const isBottleneck = currentXP >= maxXP;
  const bottleneckText = isBottleneck ? " 瓶颈" : "";

  return `${majorStageName}${tierName} ${minorStage} 阶${bottleneckText}`;
}
