import { Card } from './card.js';
import { Character } from './character.js';
import { CharacterType } from './types.js';

export class CharacterManager {
  private characters: Map<string, Character> = new Map();

  createCharacter(card: Card, type: CharacterType): Character {
    const character = new Character(card, type);
    this.characters.set(character.id, character);
    return character;
  }

  getCharacter(id: string): Character | undefined {
    return this.characters.get(id);
  }

  getAllCharacters(): Character[] {
    return Array.from(this.characters.values());
  }
}
