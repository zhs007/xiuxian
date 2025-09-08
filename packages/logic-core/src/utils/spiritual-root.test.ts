import { describe, it, expect } from "vitest";
import { getReadableSpiritualRoot } from "./spiritual-root.js";
import {
  SPIRITUAL_ROOT_METAL,
  SPIRITUAL_ROOT_WOOD,
  SPIRITUAL_ROOT_WATER,
  SPIRITUAL_ROOT_FIRE,
  SPIRITUAL_ROOT_EARTH,
  SPIRITUAL_ROOT_VARIANT,
  SPIRITUAL_ROOT_FIVE_ELEMENTS,
} from "../constants.js";

describe("getReadableSpiritualRoot", () => {
  it('should return "无灵根" for a value of 0', () => {
    expect(getReadableSpiritualRoot(0)).toBe("无灵根");
  });

  it('should handle single "天灵根"', () => {
    expect(getReadableSpiritualRoot(SPIRITUAL_ROOT_METAL)).toBe("天灵根（金）");
    expect(getReadableSpiritualRoot(SPIRITUAL_ROOT_EARTH)).toBe("天灵根（土）");
  });

  it('should handle "双灵根"', () => {
    const rootValue = SPIRITUAL_ROOT_FIRE | SPIRITUAL_ROOT_EARTH;
    expect(getReadableSpiritualRoot(rootValue)).toBe("双灵根（火/土）");
  });

  it('should handle "三灵根"', () => {
    const rootValue =
      SPIRITUAL_ROOT_METAL | SPIRITUAL_ROOT_FIRE | SPIRITUAL_ROOT_EARTH;
    expect(getReadableSpiritualRoot(rootValue)).toBe("三灵根（金/火/土）");
  });

  it('should handle "伪灵根"', () => {
    const rootValue =
      SPIRITUAL_ROOT_METAL |
      SPIRITUAL_ROOT_WOOD |
      SPIRITUAL_ROOT_WATER |
      SPIRITUAL_ROOT_FIRE;
    expect(getReadableSpiritualRoot(rootValue)).toBe("伪灵根（缺土）");
  });

  it('should handle "五行俱全"', () => {
    expect(getReadableSpiritualRoot(SPIRITUAL_ROOT_FIVE_ELEMENTS)).toBe(
      "五行俱全",
    );
  });

  it('should handle special "异灵根"', () => {
    const iceRoot =
      SPIRITUAL_ROOT_METAL | SPIRITUAL_ROOT_WATER | SPIRITUAL_ROOT_VARIANT;
    expect(getReadableSpiritualRoot(iceRoot)).toBe("异灵根（冰）");

    const thunderRoot =
      SPIRITUAL_ROOT_EARTH | SPIRITUAL_ROOT_WATER | SPIRITUAL_ROOT_VARIANT;
    expect(getReadableSpiritualRoot(thunderRoot)).toBe("异灵根（雷）");
  });

  it('should handle generic "变异灵根" if no special rule matches', () => {
    const variantRoot =
      SPIRITUAL_ROOT_METAL | SPIRITUAL_ROOT_EARTH | SPIRITUAL_ROOT_VARIANT;
    expect(getReadableSpiritualRoot(variantRoot)).toBe("变异灵根（金/土）");
  });

  it("should ignore variant bit for non-variant calculations", () => {
    // This is technically an invalid state, but the function should be robust.
    const rootValue = SPIRITUAL_ROOT_METAL | SPIRITUAL_ROOT_VARIANT;
    // It's a variant root, but with only one element, it doesn't match a special rule.
    expect(getReadableSpiritualRoot(rootValue)).toBe("变异灵根（金）");
  });
});
