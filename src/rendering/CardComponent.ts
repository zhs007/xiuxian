/**
 * @file A reusable Pixi.js component to render any type of card.
 */
import { Container, Graphics, Text, TextStyle } from 'pixi.js';
import type { Card } from '@/types/Card';

export interface CardComponentOptions {
  width: number;
  height: number;
  backgroundColor: number;
  borderColor: number;
  borderWidth: number;
  borderRadius: number;
}

const defaultOptions: CardComponentOptions = {
  width: 300,
  height: 450,
  backgroundColor: 0x2c3e50, // Dark slate blue
  borderColor: 0xecf0f1, // Light grey
  borderWidth: 4,
  borderRadius: 15,
};

export class CardComponent extends Container {
  private cardData: Card;
  private options: CardComponentOptions;

  constructor(cardData: Card, options: Partial<CardComponentOptions> = {}) {
    super();
    this.cardData = cardData;
    this.options = { ...defaultOptions, ...options };

    this.drawCard();
  }

  private drawCard(): void {
    // Create the card background and border
    const cardGraphic = new Graphics();
    cardGraphic.roundRect(0, 0, this.options.width, this.options.height, this.options.borderRadius);
    cardGraphic.fill(this.options.backgroundColor);
    cardGraphic.stroke({ width: this.options.borderWidth, color: this.options.borderColor });
    this.addChild(cardGraphic);

    // Create the card title
    const titleStyle = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 24,
      fill: '#ffffff',
      wordWrap: true,
      wordWrapWidth: this.options.width - 20,
      align: 'center',
    });
    const titleText = new Text({ text: this.cardData.name, style: titleStyle });
    titleText.x = this.options.width / 2;
    titleText.y = 20;
    titleText.anchor.set(0.5, 0);
    this.addChild(titleText);

    // Create the card description
    const descriptionStyle = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 18,
      fill: '#ecf0f1',
      wordWrap: true,
      wordWrapWidth: this.options.width - 40,
      align: 'left',
      lineHeight: 22,
    });
    const descriptionText = new Text({ text: this.cardData.description, style: descriptionStyle });
    descriptionText.x = 20;
    descriptionText.y = 80;
    this.addChild(descriptionText);
  }

  // Method to update the card's content if the data changes
  public update(newCardData: Card): void {
    this.cardData = newCardData;
    this.removeChildren(); // Clear old graphics
    this.drawCard();
  }
}
