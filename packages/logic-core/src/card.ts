import { CardType, CardData } from './types.js';

export class Card {
  id: string;
  type: CardType;
  name: string;
  description: string;
  image: string;
  data: unknown;

  constructor(data: CardData) {
    this.id = data.id;
    this.type = data.type;
    this.name = data.name;
    this.description = data.description;
    this.image = `${data.id}.png`;
    this.data = data.data;
  }
}
