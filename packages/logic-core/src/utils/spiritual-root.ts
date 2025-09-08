import {
  ALL_SPIRITUAL_ROOTS,
  SPIRITUAL_ROOT_EARTH,
  SPIRITUAL_ROOT_FIRE,
  SPIRITUAL_ROOT_METAL,
  SPIRITUAL_ROOT_VARIANT,
  SPIRITUAL_ROOT_WATER,
  SPIRITUAL_ROOT_WOOD,
} from "../constants.js";

const ROOT_NAMES: Record<number, string> = {
  [SPIRITUAL_ROOT_METAL]: "金",
  [SPIRITUAL_ROOT_WOOD]: "木",
  [SPIRITUAL_ROOT_WATER]: "水",
  [SPIRITUAL_ROOT_FIRE]: "火",
  [SPIRITUAL_ROOT_EARTH]: "土",
};

// Simple rules for variant roots. Key is the combination of base roots.
const VARIANT_ROOT_RULES: Record<number, string> = {
  [SPIRITUAL_ROOT_METAL | SPIRITUAL_ROOT_WATER]: "冰", // Metal + Water = Ice
  [SPIRITUAL_ROOT_EARTH | SPIRITUAL_ROOT_WATER]: "雷", // Earth + Water = Thunder
  [SPIRITUAL_ROOT_WOOD | SPIRITUAL_ROOT_FIRE]: "风", // Wood + Fire = Wind
  [SPIRITUAL_ROOT_WOOD | SPIRITUAL_ROOT_WATER]: "暗", // Wood + Water = Dark
  [SPIRITUAL_ROOT_FIRE | SPIRITUAL_ROOT_METAL]: "光", // Fire + Metal = Light
};

/**
 * Generates a human-readable string for a given spiritual root value.
 * @param rootValue The numeric bitmask representing the spiritual root.
 * @returns A descriptive string (e.g., "天灵根（土）", "异灵根（雷）").
 */
export function getReadableSpiritualRoot(rootValue: number): string {
  const isVariant = (rootValue & SPIRITUAL_ROOT_VARIANT) !== 0;
  const baseRoots = rootValue & ~SPIRITUAL_ROOT_VARIANT;

  const presentRoots = ALL_SPIRITUAL_ROOTS.filter(
    (root) => (baseRoots & root) !== 0,
  );
  const rootCount = presentRoots.length;
  const rootNames = presentRoots.map((root) => ROOT_NAMES[root]).join("/");

  if (isVariant) {
    // For variants, check if the combination matches a special variant rule.
    const variantName = VARIANT_ROOT_RULES[baseRoots];
    if (variantName) {
      return `异灵根（${variantName}）`;
    }
    // If no special rule, just show the components.
    return `变异灵根（${rootNames}）`;
  }

  switch (rootCount) {
    case 0:
      return "无灵根";
    case 1:
      return `天灵根（${rootNames}）`;
    case 2:
      return `双灵根（${rootNames}）`;
    case 3:
      return `三灵根（${rootNames}）`;
    case 4: {
      const missingRoot = ALL_SPIRITUAL_ROOTS.find(
        (root) => (baseRoots & root) === 0,
      );
      const missingRootName = missingRoot ? ROOT_NAMES[missingRoot] : "";
      return `伪灵根（缺${missingRootName}）`;
    }
    case 5:
      return "五行俱全";
    default:
      return "未知灵根";
  }
}
