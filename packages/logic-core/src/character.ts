import { v4 as uuidv4 } from 'uuid';
import { Card } from './card.js';
import { CharacterType } from './types.js';

export class Character {
  id: string;
  name: string;
  card: Card;
  type: CharacterType;
  attributes: Map<string, number>;

  constructor(card: Card, type: CharacterType) {
    this.id = uuidv4();
    this.name = card.name;
    this.card = card;
    this.type = type;
    this.attributes = new Map<string, number>();
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
