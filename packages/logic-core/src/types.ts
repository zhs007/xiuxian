export enum CardType {
  CHARACTER,
  ACTION,
  EVENT,
  ITEM,
}

export interface CardData {
  id: string;
  type: CardType;
  name: string;
  description: string;
  data?: unknown;
}
