# Character Attributes Documentation

This document lists and describes all the core attributes associated with a character in the game. All attributes are stored as `number` values in the character's attribute map.

## Core Attributes

### `age`
- **Name**: 年龄 (Age)
- **Type**: `number`
- **Description**: The character's current age. Age is a critical factor for progression, as certain cultivation milestones must be reached before specific ages.

### `spirit_stones`
- **Name**: 灵石 (Spirit Stones)
- **Type**: `number`
- **Description**: The primary currency in the game. Used for purchasing items, pills, and other resources.

## Cultivation Attributes

### `cultivation_stage`
- **Name**: 修仙阶段 (Cultivation Stage)
- **Type**: `number`
- **Description**: A single integer that represents the character's current cultivation level. The format is `Mmmm`, where `M` is the major stage and `mmm` is the minor stage.
- **Examples**:
    - `0`: 凡人 (Mortal)
    - `1001`: 炼气 1 阶 (Qi Refining - Stage 1)
    - `1012`: 炼气 12 阶 (Qi Refining - Stage 12)
    - `2001`: 筑基 1 阶 (Foundation Establishment - Stage 1)
    - `2009`: 筑基 9 阶 (Foundation Establishment - Stage 9)

### `cultivation_xp`
- **Name**: 当前修仙经验 (Current Cultivation Experience)
- **Type**: `number`
- **Description**: The character's current experience points within their cultivation stage. When this value reaches `cultivation_xp_max`, the character may advance to the next minor stage or face a bottleneck.

### `cultivation_xp_max`
- **Name**: 修仙经验最大值 (Max Cultivation Experience)
- **Type**: `number`
- **Description**: The total experience points required to master the current cultivation stage. This value is determined by a static configuration table based on the character's `cultivation_stage`.

## Innate Attributes

### `spiritual_root`
- **Name**: 灵根 (Spiritual Root)
- **Type**: `number`
- **Description**: A bitmask representing the character's innate elemental affinities. These affinities determine cultivation speed and compatibility with certain techniques.
- **Bitmask Layout**:
    - `Bit 0`: 金 (Metal)
    - `Bit 1`: 木 (Wood)
    - `Bit 2`: 水 (Water)
    - `Bit 3`: 火 (Fire)
    - `Bit 4`: 土 (Earth)
    - `Bit 5`: 变 (Variant/Mutated) - Indicates a mutated root, which alters the interpretation of the other bits.
- **Example Values**:
    - `1` (0b000001): Metal Root
    - `12` (0b001100): Fire and Earth Root
    - `31` (0b011111): Five Elements Root
    - `35` (0b100011): Mutated Metal/Wood Root (e.g., could become "Thunder")
