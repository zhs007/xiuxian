import { describe, it, expect, beforeEach } from 'vitest';
import { CharacterManager } from './character-manager.js';
import { Card } from './card.js';
import { CardType, CharacterType } from './types.js';

describe('CharacterManager', () => {
  let characterManager: CharacterManager;
  let card: Card;

  beforeEach(() => {
    characterManager = new CharacterManager();
    card = new Card({
      id: 'character1',
      type: CardType.CHARACTER,
      name: 'Test Character',
      description: 'A character for testing.',
    });
  });

  it('should create a new character', () => {
    const character = characterManager.createCharacter(card, CharacterType.PLAYER);
    expect(character).toBeDefined();
    expect(character.name).toBe('Test Character');
    expect(character.type).toBe(CharacterType.PLAYER);
  });

  it('should get a character by its ID', () => {
    const newCharacter = characterManager.createCharacter(card, CharacterType.NPC);
    const retrievedCharacter = characterManager.getCharacter(newCharacter.id);
    expect(retrievedCharacter).toBe(newCharacter);
  });

  it('should return undefined for a non-existent character ID', () => {
    const retrievedCharacter = characterManager.getCharacter('non-existent-id');
    expect(retrievedCharacter).toBeUndefined();
  });

  it('should get all characters', () => {
    characterManager.createCharacter(card, CharacterType.PLAYER);
    characterManager.createCharacter(card, CharacterType.NPC);
    const allCharacters = characterManager.getAllCharacters();
    expect(allCharacters.length).toBe(2);
  });

  it('should return an empty array if no characters exist', () => {
    const allCharacters = characterManager.getAllCharacters();
    expect(allCharacters.length).toBe(0);
  });
});
