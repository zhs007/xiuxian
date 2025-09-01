import { Game } from './logic/Game';
import { Renderer } from './rendering/Renderer';
import type { CharacterCard, EventCard } from './types/Card';
import { CardType } from './types/Card';

// --- Mock Data for Demonstration ---
const mockPlayerCard: CharacterCard = {
  id: 'cc_player_01',
  name: 'First Cultivator',
  type: CardType.Character,
  gender: 'female',
  description: 'A young soul with a promising future.',
  illustration: 'path/to/player_art.png',
};

const mockEventDeck: EventCard[] = [
  {
    id: 'ev_001',
    name: 'A Fork in the Road',
    type: CardType.Event,
    description: 'You encounter a weathered signpost. The left path leads into a dark forest, the right towards a bustling town.',
    illustration: 'path/to/fork_art.png',
    options: [
      { description: 'Venture into the forest.', outcomeId: 'forest_1' },
      { description: 'Head towards the town.', outcomeId: 'town_1' },
    ],
  },
  {
    id: 'ev_002',
    name: 'A Glimmer in the River',
    type: CardType.Event,
    description: 'While resting by a river, you spot a faint glimmer beneath the surface.',
    illustration: 'path/to/river_art.png',
    options: [
      { description: 'Reach in to grab it.', outcomeId: 'grab_glimmer' },
      { description: 'Ignore it and rest.', outcomeId: 'rest' },
    ],
  },
];

// --- Application Entry Point ---

function main() {
  // 1. Get the container element from the DOM
  const container = document.getElementById('app');
  if (!container) {
    console.error("Fatal: Could not find container with id 'app'");
    return;
  }

  // 2. Initialize the game logic controller
  const game = new Game();

  // 3. Initialize the renderer
  const renderer = new Renderer(game);
  renderer.init(container);

  // 4. Start a new game
  game.startNewGame(mockPlayerCard, 'Jules', mockEventDeck);

  // 5. Draw the first event to kick things off
  game.drawNextEvent();

  // 6. Tell the renderer to draw the initial state
  renderer.draw();

  console.log('Game and Renderer initialized.');
}

main();
