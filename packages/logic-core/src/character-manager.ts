import { Card } from './card.js';
import { Character } from './character.js';
import { CharacterType } from './types.js';

export class CharacterManager {
  private characters: Map<string, Character> = new Map();
  private playerCharacterId: string | null = null;

  createCharacter(card: Card, name: string, type: CharacterType): Character {
    if (type === CharacterType.PLAYER) {
      if (this.playerCharacterId !== null) {
        throw new Error('A player character already exists. Only one player is allowed.');
      }
    }

    const character = new Character(name, card, type);
    this.characters.set(character.id, character);

    if (type === CharacterType.PLAYER) {
      this.playerCharacterId = character.id;
    }

    return character;
  }

  getCharacter(id: string): Character | undefined {
    return this.characters.get(id);
  }

  getPlayer(): Character | undefined {
    if (this.playerCharacterId === null) {
      return undefined;
    }
    return this.getCharacter(this.playerCharacterId);
  }

  getAllCharacters(): Character[] {
    return Array.from(this.characters.values());
  }
}
