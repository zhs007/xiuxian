import { CardData, CardRarity, CardType } from "./types.js";

export class Card {
  public readonly cardData: CardData;

  constructor(cardData: CardData) {
    this.cardData = cardData;
  }

  get id(): string {
    return this.cardData.id;
  }

  get type(): CardType {
    return this.cardData.type;
  }

  get name(): string {
    return this.cardData.name;
  }

  get description(): string {
    return this.cardData.description;
  }

  get rarity(): CardRarity {
    return this.cardData.rarity;
  }

  get image(): string {
    return `${this.cardData.id}.png`;
  }

  get data(): unknown {
    return this.cardData.data;
  }
}
