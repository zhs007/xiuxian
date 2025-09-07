export enum CardRarity {
  COMMON, // White: Common
  RARE, // Blue: Rare
  EPIC, // Purple: Epic
  LEGENDARY, // Orange: Legendary
}

export enum CardType {
  CHARACTER,
  ACTION,
  EVENT,
  ITEM,
}

// CharacterCardData represents the initial attributes of a character.
// It's a map-like structure for extensibility.
export type CharacterCardData = Record<string, number>;

// A discriminated union for all possible card data structures.
// This allows for type-safe access to card-specific `data` properties.
export type CardData =
  | {
      id: string;
      type: CardType.CHARACTER;
      name:string;
      description: string;
      rarity: CardRarity;
      data: CharacterCardData;
    }
  | {
      id: string;
      type: CardType.ACTION;
      name: string;
      description: string;
      rarity: CardRarity;
      data?: unknown;
    }
  | {
      id: string;
      type: CardType.EVENT;
      name: string;
      description: string;
      rarity: CardRarity;
      data?: unknown;
    }
  | {
      id: string;
      type: CardType.ITEM;
      name: string;
      description: string;
      rarity: CardRarity;
      data?: unknown;
    };

export enum CharacterType {
  PLAYER,
  NPC,
}
