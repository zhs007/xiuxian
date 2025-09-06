import * as fs from 'fs';
import * as path from 'path';
import { Card } from './card.js';
import { CardData } from './types.js';

export class CardManager {
  private cards: Map<string, Card> = new Map();

  async load(directory: string): Promise<void> {
    const files = await fs.promises.readdir(directory);
    for (const file of files) {
      if (path.extname(file) === '.json') {
        const filePath = path.join(directory, file);
        const fileContent = await fs.promises.readFile(filePath, 'utf-8');
        const cardData: CardData = JSON.parse(fileContent);
        const card = new Card(cardData);
        this.cards.set(card.id, card);
      }
    }
  }

  getCard(id: string): Card | undefined {
    return this.cards.get(id);
  }

  getAllCards(): Card[] {
    return Array.from(this.cards.values());
  }
}
