/**
 * @file Manages the creation and state of all characters in the game.
 */
import type { Character, CharacterId } from '@/types/Character';
import type { Attributes, AttributeKey } from '@/types/Attribute';
import type { CharacterCard, CardId } from '@/types/Card';
import type { EventListenerSystem } from './EventListenerSystem';
import { GameEventType } from '@/types/Event';
import { Inventory, EquippedItems } from '@/types/Character';
import { AnyItemCard } from '@/types/ItemCard';

/**
 * Manages all character instances, their attributes, and inventories.
 * It integrates with the EventListenerSystem to announce changes.
 */
export class CharacterManager {
  private characters: Map<CharacterId, Character> = new Map();
  private eventSystem: EventListenerSystem;
  private nextId: number = 1;

  constructor(eventSystem: EventListenerSystem) {
    this.eventSystem = eventSystem;
  }

  /**
   * Generates a unique ID for a new character.
   */
  private generateId(): CharacterId {
    return `char_${this.nextId++}`;
  }

  /**
   * Creates a new character instance from a base card and adds it to the manager.
   * @param baseCard The character card to use as a template.
   * @param name The name for the character instance.
   * @returns The newly created character object.
   */
  public createCharacter(baseCard: CharacterCard, name: string): Character {
    const id = this.generateId();
    const newCharacter: Character = {
      id,
      baseCard,
      name,
      attributes: new Map() as Attributes,
      inventory: new Map() as Inventory,
      equippedItems: new Map() as EquippedItems,
    };
    this.characters.set(id, newCharacter);
    return newCharacter;
  }

  /**
   * Retrieves a character by their ID.
   * @param id The ID of the character to retrieve.
   * @returns The character object, or undefined if not found.
   */
  public getCharacter(id: CharacterId): Character | undefined {
    return this.characters.get(id);
  }

  /**
   * Gets the value of a specific attribute for a character.
   * @param id The ID of the character.
   * @param attributeKey The key of the attribute to get.
   * @returns The value of the attribute, or 0 if not set or character not found.
   */
  public getAttribute(id: CharacterId, attributeKey: AttributeKey): number {
    const character = this.getCharacter(id);
    return character?.attributes.get(attributeKey) ?? 0;
  }

  /**
   * Sets the value of a specific attribute for a character.
   * This will dispatch AttributeWillChange and AttributeDidChange events.
   * @param id The ID of the character.
   * @param attributeKey The key of the attribute to set.
   * @param value The new value for the attribute.
   */
  public setAttribute(id: CharacterId, attributeKey: AttributeKey, value: number): void {
    const character = this.getCharacter(id);
    if (!character) {
      return;
    }

    const oldValue = this.getAttribute(id, attributeKey);
    if (oldValue === value) {
      return; // No change, no events.
    }

    // 1. Dispatch "will change" event
    this.eventSystem.dispatch({
      type: GameEventType.AttributeWillChange,
      payload: {
        targetCharacterId: id,
        attribute: attributeKey,
        from: oldValue,
        to: value,
      },
    });

    // In a future implementation, a listener might modify the payload or cancel the event.
    // For now, we proceed directly.

    // 2. Apply the change
    character.attributes.set(attributeKey, value);

    // 3. Dispatch "did change" event
    this.eventSystem.dispatch({
      type: GameEventType.AttributeDidChange,
      payload: {
        targetCharacterId: id,
        attribute: attributeKey,
        from: oldValue,
        to: value,
      },
    });
  }

  public toJSON() {
    // Convert maps to arrays for serialization
    const characters = Array.from(this.characters.entries()).map(([id, char]) => {
      return {
        ...char,
        attributes: Array.from(char.attributes.entries()),
        inventory: Array.from(char.inventory.entries()),
        equippedItems: Array.from(char.equippedItems.entries()),
      };
    });
    return {
      nextId: this.nextId,
      characters,
    };
  }

  static fromJSON(data: any, eventSystem: EventListenerSystem): CharacterManager {
    const instance = new CharacterManager(eventSystem);
    if (!data) return instance;

    instance.nextId = data.nextId ?? 1;
    const characters = data.characters.map((charData: any) => {
      return {
        ...charData,
        attributes: new Map(charData.attributes),
        inventory: new Map(charData.inventory),
        equippedItems: new Map(charData.equippedItems),
      };
    });
    instance.characters = new Map(characters.map((c: Character) => [c.id, c]));
    return instance;
  }

  public addItem(id: CharacterId, item: AnyItemCard): void {
    const character = this.getCharacter(id);
    if (!character) return;

    character.inventory.set(item.id, item);
    this.eventSystem.dispatch({
      type: GameEventType.ItemWasGained,
      payload: { characterId: id, item },
    });
  }

  public removeItem(id: CharacterId, itemId: CardId): void {
    const character = this.getCharacter(id);
    if (!character) return;

    const item = character.inventory.get(itemId);
    if (item) {
      character.inventory.delete(itemId);
      this.eventSystem.dispatch({
        type: GameEventType.ItemWasLost,
        payload: { characterId: id, item },
      });
    }
  }
}
