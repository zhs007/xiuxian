import { describe, it, expect } from "vitest";
import { getReadableCultivationStage } from "./cultivation.js";

describe("getReadableCultivationStage", () => {
  it('should return "凡人" for stage 0', () => {
    expect(getReadableCultivationStage(0, 0, 0)).toBe("凡人");
  });

  // Tests for 炼气期 (12 stages)
  describe("炼气期", () => {
    it("should correctly identify 初期 (early stage)", () => {
      expect(getReadableCultivationStage(1001, 100, 50)).toBe("炼气初期 1 阶");
      expect(getReadableCultivationStage(1004, 160, 80)).toBe("炼气初期 4 阶");
    });

    it("should correctly identify 中期 (mid stage)", () => {
      expect(getReadableCultivationStage(1005, 200, 100)).toBe("炼气中期 5 阶");
      expect(getReadableCultivationStage(1008, 260, 130)).toBe("炼气中期 8 阶");
    });

    it("should correctly identify 后期 (late stage)", () => {
      expect(getReadableCultivationStage(1009, 300, 150)).toBe("炼气后期 9 阶");
      expect(getReadableCultivationStage(1012, 400, 200)).toBe(
        "炼气后期 12 阶",
      );
    });
  });

  // Tests for 筑基期 (9 stages)
  describe("筑基期", () => {
    it("should correctly identify 初期 (early stage)", () => {
      expect(getReadableCultivationStage(2001, 1000, 500)).toBe(
        "筑基初期 1 阶",
      );
      expect(getReadableCultivationStage(2003, 1200, 600)).toBe(
        "筑基初期 3 阶",
      );
    });

    it("should correctly identify 中期 (mid stage)", () => {
      expect(getReadableCultivationStage(2004, 1300, 650)).toBe(
        "筑基中期 4 阶",
      );
      expect(getReadableCultivationStage(2006, 1500, 750)).toBe(
        "筑基中期 6 阶",
      );
    });

    it("should correctly identify 后期 (late stage)", () => {
      expect(getReadableCultivationStage(2007, 1600, 800)).toBe(
        "筑基后期 7 阶",
      );
      expect(getReadableCultivationStage(2009, 1800, 900)).toBe(
        "筑基后期 9 阶",
      );
    });
  });

  // Test for bottleneck
  it('should append "瓶颈" when currentXP is equal to or greater than maxXP', () => {
    expect(getReadableCultivationStage(1003, 140, 140)).toBe(
      "炼气初期 3 阶 瓶颈",
    );
    expect(getReadableCultivationStage(2009, 1800, 1800)).toBe(
      "筑基后期 9 阶 瓶颈",
    );
    expect(getReadableCultivationStage(2009, 1800, 9999)).toBe(
      "筑基后期 9 阶 瓶颈",
    );
  });

  it('should not append "瓶颈" when currentXP is less than maxXP', () => {
    expect(getReadableCultivationStage(1003, 140, 139)).toBe("炼气初期 3 阶");
  });

  it("should handle unknown major stages gracefully", () => {
    expect(getReadableCultivationStage(99001, 100, 50)).toBe("未知初期 1 阶");
  });
});
