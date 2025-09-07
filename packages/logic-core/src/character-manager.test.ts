import { describe, it, expect, beforeEach } from 'vitest';
import { CharacterManager } from './character-manager.js';
import { Card } from './card.js';
import { CardRarity, CardType, CharacterType } from './types.js';

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
      rarity: CardRarity.COMMON,
      data: {},
    });
  });

  it('should create a new character', () => {
    const character = characterManager.createCharacter(
      card,
      'Test Name',
      CharacterType.PLAYER,
    );
    expect(character).toBeDefined();
    expect(character.name).toBe('Test Name');
    expect(character.type).toBe(CharacterType.PLAYER);
  });

  it('should get a character by its ID', () => {
    const newCharacter = characterManager.createCharacter(
      card,
      'Test Name',
      CharacterType.NPC,
    );
    const retrievedCharacter = characterManager.getCharacter(newCharacter.id);
    expect(retrievedCharacter).toBe(newCharacter);
  });

  it('should return undefined for a non-existent character ID', () => {
    const retrievedCharacter = characterManager.getCharacter('non-existent-id');
    expect(retrievedCharacter).toBeUndefined();
  });

  it('should get all characters', () => {
    characterManager.createCharacter(card, 'Player 1', CharacterType.PLAYER);
    characterManager.createCharacter(card, 'NPC 1', CharacterType.NPC);
    const allCharacters = characterManager.getAllCharacters();
    expect(allCharacters.length).toBe(2);
  });

  it('should return an empty array if no characters exist', () => {
    const allCharacters = characterManager.getAllCharacters();
    expect(allCharacters.length).toBe(0);
  });

  it('should get the player character', () => {
    const player = characterManager.createCharacter(
      card,
      'Player 1',
      CharacterType.PLAYER,
    );
    characterManager.createCharacter(card, 'NPC 1', CharacterType.NPC);
    const retrievedPlayer = characterManager.getPlayer();
    expect(retrievedPlayer).toBe(player);
  });

  it('should return undefined if no player character exists', () => {
    characterManager.createCharacter(card, 'NPC 1', CharacterType.NPC);
    const retrievedPlayer = characterManager.getPlayer();
    expect(retrievedPlayer).toBeUndefined();
  });

  it('should throw an error if creating a second player character', () => {
    characterManager.createCharacter(card, 'Player 1', CharacterType.PLAYER);
    expect(() => {
      characterManager.createCharacter(card, 'Player 2', CharacterType.PLAYER);
    }).toThrow('A player character already exists. Only one player is allowed.');
  });

  it('should create a character with attributes from card data', () => {
    const cardWithData = new Card({
      id: 'character2',
      type: CardType.CHARACTER,
      name: 'Character With Data',
      description: 'A character with initial attributes.',
      rarity: CardRarity.COMMON,
      data: {
        hp: 100,
        mp: 50,
      },
    });

    const character = characterManager.createCharacter(
      cardWithData,
      'Hero',
      CharacterType.PLAYER,
    );

    expect(character.name).toBe('Hero');
    expect(character.getAttribute('hp')).toBe(100);
    expect(character.getAttribute('mp')).toBe(50);
    expect(character.getAttribute('atk')).toBe(0);
  });
});
