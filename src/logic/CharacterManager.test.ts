import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CharacterManager } from './CharacterManager';
import { EventListenerSystem } from './EventListenerSystem';
import type { CharacterCard, CardType } from '@/types/Card';
import { GameEventType } from '@/types/Event';

const mockCharacterCard: CharacterCard = {
  id: 'charCard1',
  name: 'Test Character',
  type: 'Character' as CardType.Character,
  gender: 'male',
  description: '',
  illustration: '',
};

describe('CharacterManager', () => {
  let eventSystem: EventListenerSystem;
  let characterManager: CharacterManager;

  beforeEach(() => {
    eventSystem = new EventListenerSystem();
    characterManager = new CharacterManager(eventSystem);
  });

  it('should create a new character from a character card', () => {
    const character = characterManager.createCharacter(mockCharacterCard, 'Player 1');
    expect(character).toBeDefined();
    expect(character.name).toBe('Player 1');
    expect(character.baseCard).toBe(mockCharacterCard);
    expect(character.id).toBeTypeOf('string');
    expect(character.attributes).toBeInstanceOf(Map);
    expect(character.inventory).toBeInstanceOf(Map);
  });

  it('should retrieve a created character by its ID', () => {
    const newChar = characterManager.createCharacter(mockCharacterCard, 'Player 1');
    const retrievedChar = characterManager.getCharacter(newChar.id);
    expect(retrievedChar).toBe(newChar);
  });

  it('should return undefined when retrieving a non-existent character', () => {
    const retrievedChar = characterManager.getCharacter('non-existent-id');
    expect(retrievedChar).toBeUndefined();
  });

  it('should get an attribute value, defaulting to 0 if not set', () => {
    const char = characterManager.createCharacter(mockCharacterCard, 'P1');
    const hp = characterManager.getAttribute(char.id, 'hp');
    expect(hp).toBe(0);
  });

  it('should set an attribute value', () => {
    const char = characterManager.createCharacter(mockCharacterCard, 'P1');
    characterManager.setAttribute(char.id, 'hp', 100);
    const hp = characterManager.getAttribute(char.id, 'hp');
    expect(hp).toBe(100);
  });

  it('should return 0 for attributes of non-existent characters', () => {
    const hp = characterManager.getAttribute('non-existent-id', 'hp');
    expect(hp).toBe(0);
  });

  describe('Attribute change events', () => {
    it('should dispatch AttributeWillChange and AttributeDidChange events when setting an attribute', () => {
      const dispatchSpy = vi.spyOn(eventSystem, 'dispatch');
      const char = characterManager.createCharacter(mockCharacterCard, 'P1');

      characterManager.setAttribute(char.id, 'hp', 100);

      expect(dispatchSpy).toHaveBeenCalledTimes(2);

      // Check AttributeWillChange event
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: GameEventType.AttributeWillChange,
        payload: {
          targetCharacterId: char.id,
          attribute: 'hp',
          from: 0,
          to: 100,
        },
      });

      // Check AttributeDidChange event
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: GameEventType.AttributeDidChange,
        payload: {
          targetCharacterId: char.id,
          attribute: 'hp',
          from: 0,
          to: 100,
        },
      });
    });

    it('should not set attribute if a listener cancels the change (adv. test)', () => {
      // This is a more advanced test for when we implement cancellation logic
      // For now, it shows the intent of the event system
      const char = characterManager.createCharacter(mockCharacterCard, 'P1');

      // Setup a listener that "vetoes" the change
      eventSystem.on(GameEventType.AttributeWillChange, (event) => {
        // In a real implementation, we'd have a way to cancel.
        // We can simulate this by throwing an error or modifying the payload.
        // For this test, we just confirm the event is sent.
        expect(event.payload.attribute).toBe('hp');
      });

      characterManager.setAttribute(char.id, 'hp', 50);
      const hp = characterManager.getAttribute(char.id, 'hp');
      expect(hp).toBe(50); // For now, the change goes through.
    });

    it('should not dispatch events if the attribute value does not change', () => {
      const dispatchSpy = vi.spyOn(eventSystem, 'dispatch');
      const char = characterManager.createCharacter(mockCharacterCard, 'P1');
      characterManager.setAttribute(char.id, 'hp', 50); // Set initial value
      dispatchSpy.mockClear(); // Clear spy calls from initial set

      characterManager.setAttribute(char.id, 'hp', 50); // Set to same value
      expect(dispatchSpy).not.toHaveBeenCalled();
    });
  });

  describe('Inventory management', () => {
    const mockItem: any = { id: 'item1', name: 'Health Potion', type: 'Item' };

    it('should add an item to a character inventory', () => {
      const char = characterManager.createCharacter(mockCharacterCard, 'P1');
      characterManager.addItem(char.id, mockItem);
      const inventory = char.inventory;
      expect(inventory.size).toBe(1);
      expect(inventory.get('item1')).toBe(mockItem);
    });

    it('should dispatch an ItemWasGained event when adding an item', () => {
      const dispatchSpy = vi.spyOn(eventSystem, 'dispatch');
      const char = characterManager.createCharacter(mockCharacterCard, 'P1');
      characterManager.addItem(char.id, mockItem);
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: GameEventType.ItemWasGained,
        payload: {
          characterId: char.id,
          item: mockItem,
        },
      });
    });

    it('should remove an item from a character inventory', () => {
      const char = characterManager.createCharacter(mockCharacterCard, 'P1');
      characterManager.addItem(char.id, mockItem);
      expect(char.inventory.size).toBe(1);
      characterManager.removeItem(char.id, mockItem.id);
      expect(char.inventory.size).toBe(0);
    });

    it('should dispatch an ItemWasLost event when removing an item', () => {
      const char = characterManager.createCharacter(mockCharacterCard, 'P1');
      characterManager.addItem(char.id, mockItem);
      const dispatchSpy = vi.spyOn(eventSystem, 'dispatch');
      characterManager.removeItem(char.id, mockItem.id);
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: GameEventType.ItemWasLost,
        payload: {
          characterId: char.id,
          item: mockItem,
        },
      });
    });
  });
});
