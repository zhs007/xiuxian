import { describe, it, expect, beforeEach } from 'vitest';
import { Character } from './character.js';
import { Card } from './card.js';
import { CardRarity, CardType, CharacterType } from './types.js';

describe('Character', () => {
  let card: Card;

  beforeEach(() => {
    card = new Card({
      id: 'character1',
      type: CardType.CHARACTER,
      name: 'Test Character',
      description: 'A character for testing.',
      rarity: CardRarity.COMMON,
      data: {},
    });
  });

  it('should create a new character with a unique ID', () => {
    const character1 = new Character('p1', card, CharacterType.PLAYER);
    const character2 = new Character('p2', card, CharacterType.NPC);
    expect(character1.id).not.toBe(character2.id);
  });

  it('should initialize with the correct name', () => {
    const character = new Character('Test Name', card, CharacterType.PLAYER);
    expect(character.name).toBe('Test Name');
  });

  it('should initialize with the correct card', () => {
    const character = new Character('Test Name', card, CharacterType.PLAYER);
    expect(character.card).toBe(card);
  });

  it('should initialize with the correct character type', () => {
    const character = new Character('Test Name', card, CharacterType.PLAYER);
    expect(character.type).toBe(CharacterType.PLAYER);
  });

  it('should initialize with an empty attributes map if card has no data', () => {
    const character = new Character('Test Name', card, CharacterType.PLAYER);
    expect(character.attributes.size).toBe(0);
  });

  it('should get an attribute with a default value of 0', () => {
    const character = new Character('Test Name', card, CharacterType.PLAYER);
    const hp = character.getAttribute('hp');
    expect(hp).toBe(0);
    expect(character.attributes.get('hp')).toBe(0);
  });

  it('should set and get an attribute', () => {
    const character = new Character('Test Name', card, CharacterType.PLAYER);
    character.setAttribute('atk', 10);
    const atk = character.getAttribute('atk');
    expect(atk).toBe(10);
  });

  it('should update an existing attribute', () => {
    const character = new Character('Test Name', card, CharacterType.PLAYER);
    character.setAttribute('def', 5);
    character.setAttribute('def', 8);
    const def = character.getAttribute('def');
    expect(def).toBe(8);
  });

  it('should initialize attributes from the card data', () => {
    const cardWithData = new Card({
      id: 'character2',
      type: CardType.CHARACTER,
      name: 'Character With Data',
      description: 'A character with initial attributes.',
      rarity: CardRarity.COMMON,
      data: {
        hp: 100,
        mp: 50,
        atk: 15,
      },
    });

    const character = new Character(
      'Test Name',
      cardWithData,
      CharacterType.PLAYER,
    );
    expect(character.attributes.size).toBe(3);
    expect(character.getAttribute('hp')).toBe(100);
    expect(character.getAttribute('mp')).toBe(50);
    expect(character.getAttribute('atk')).toBe(15);
    expect(character.getAttribute('def')).toBe(0); // Check a non-existent attribute
  });
});
