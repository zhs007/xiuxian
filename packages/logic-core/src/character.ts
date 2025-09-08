import { v4 as uuidv4 } from "uuid";
import { Card } from "./card.js";
import { CardType, CharacterType } from "./types.js";

export class Character {
  id: string;
  name: string;
  card: Card;
  type: CharacterType;
  attributes: Map<string, number>;

  constructor(name: string, card: Card, type: CharacterType) {
    this.id = uuidv4();
    this.name = name;
    this.card = card;
    this.type = type;
    this.attributes = new Map<string, number>();

    if (card.type === CardType.CHARACTER && card.data) {
      // The `data` from a character card is specified as CharacterCardData
      // which is Record<string, number>. We cast it here and populate attributes.
      const cardData = card.data as Record<string, number>;
      for (const [key, value] of Object.entries(cardData)) {
        this.setAttribute(key, value);
      }
    }
  }

  getAttribute(name: string): number {
    if (!this.attributes.has(name)) {
      this.attributes.set(name, 0);
    }
    return this.attributes.get(name) as number;
  }

  setAttribute(name: string, value: number): void {
    this.attributes.set(name, value);
  }
}
