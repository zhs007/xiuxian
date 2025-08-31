/**
 * @file The main controller for the game logic, orchestrating all systems.
 */
import { EventListenerSystem } from './EventListenerSystem';
import { CharacterManager } from './CharacterManager';
import { DeckManager } from './DeckManager';
import type { Character, CharacterId } from '@/types/Character';
import type { CharacterCard, EventCard } from '@/types/Card';
import { OutcomeRegistry } from './OutcomeRegistry';
import type { OutcomeResult } from '@/types/Outcome';

/**
 * Manages the overall game state and flow.
 */
export class Game {
  private eventListenerSystem: EventListenerSystem;
  private characterManager: CharacterManager;
  private deckManager?: DeckManager;

  private playerCharacterId?: CharacterId;
  private currentEvent?: EventCard;

  constructor() {
    this.eventListenerSystem = new EventListenerSystem();
    this.characterManager = new CharacterManager(this.eventListenerSystem);
  }

  /**
   * Starts a new game session.
   * @param playerCard The card chosen by the player for their character.
   * @param playerName The name of the player character.
   * @param initialDeck The initial set of event cards for the game.
   */
  public startNewGame(
    playerCard: CharacterCard,
    playerName: string,
    initialDeck: EventCard[]
  ): void {
    const player = this.characterManager.createCharacter(playerCard, playerName);
    this.playerCharacterId = player.id;
    this.deckManager = new DeckManager(initialDeck);
    this.deckManager.shuffle();
  }

  /**
   * Draws the next event card from the deck and sets it as the active event.
   * @returns The drawn event card, or undefined if the deck is empty.
   */
  public drawNextEvent(): EventCard | undefined {
    if (!this.deckManager) {
      // Game not started
      return undefined;
    }
    const event = this.deckManager.draw();
    this.currentEvent = event;
    return event;
  }

  /**
   * Resolves the player's choice for the current active event.
   * @param choiceIndex The index of the option chosen by the player (0 or 1).
   */
  public resolveChoice(choiceIndex: 0 | 1): void {
    if (!this.currentEvent) {
      throw new Error('Cannot resolve choice: no current event is active.');
    }
    if (choiceIndex < 0 || choiceIndex >= this.currentEvent.options.length) {
      throw new Error(`Invalid choice index: ${choiceIndex}`);
    }

    const chosenOption = this.currentEvent.options[choiceIndex];
    const outcome = OutcomeRegistry.getOutcome(chosenOption.outcomeId);
    const player = this.getPlayerCharacter();

    if (!outcome || !player) {
      // Outcome not found or player missing, fail gracefully
      this.currentEvent = undefined;
      return;
    }

    let result: OutcomeResult;
    let meetsRequirements = true;

    // Check requirements
    if (outcome.requirements) {
      for (const req of outcome.requirements) {
        if (this.characterManager.getAttribute(player.id, req.attribute) < req.value) {
          meetsRequirements = false;
          break;
        }
      }
    }

    result = meetsRequirements ? outcome.success : outcome.failure;

    // Apply the results
    if (result.attributes) {
      for (const attrChange of result.attributes) {
        const currentVal = this.characterManager.getAttribute(player.id, attrChange.key);
        this.characterManager.setAttribute(player.id, attrChange.key, currentVal + attrChange.value);
      }
    }
    if (result.itemsGained) {
      for (const itemId of result.itemsGained) {
        const itemData = OutcomeRegistry.getItem(itemId);
        if (itemData) {
          this.characterManager.addItem(player.id, itemData);
        }
      }
    }
    // TODO: Handle itemsLost

    console.log(result.narration); // Log the result
    this.currentEvent = undefined;
  }

  // --- Getter methods for external access (e.g., by the renderer) ---

  public getPlayerCharacter(): Character | undefined {
    if (!this.playerCharacterId) return undefined;
    return this.characterManager.getCharacter(this.playerCharacterId);
  }

  public getCurrentEvent(): EventCard | undefined {
    return this.currentEvent;
  }

  public getDeckManager(): DeckManager {
    if (!this.deckManager) {
      throw new Error("Deck manager is not initialized. Have you started a new game?");
    }
    return this.deckManager;
  }

  public getCharacterManager(): CharacterManager {
    return this.characterManager;
  }

  public saveState(): string {
    const state = {
      playerCharacterId: this.playerCharacterId,
      currentEvent: this.currentEvent,
      deckManagerState: this.deckManager?.toJSON(),
      characterManagerState: this.characterManager.toJSON(),
    };
    return JSON.stringify(state, null, 2);
  }

  public loadState(jsonState: string): void {
    const state = JSON.parse(jsonState);
    if (!state) return;

    this.playerCharacterId = state.playerCharacterId;
    this.currentEvent = state.currentEvent;

    // Re-create the managers from the saved state
    if (state.deckManagerState) {
      this.deckManager = DeckManager.fromJSON(state.deckManagerState);
    }
    if (state.characterManagerState) {
      this.characterManager = CharacterManager.fromJSON(state.characterManagerState, this.eventListenerSystem);
    }
  }
}
