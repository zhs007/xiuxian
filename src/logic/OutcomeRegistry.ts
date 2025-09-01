/**
 * @file A registry to hold all possible outcomes of player choices.
 * In a real game, this would be loaded from a database or data files.
 */

import type { Outcome } from '@/types/Outcome';

const outcomes: Record<string, Outcome> = {
  'forest_1': {
    id: 'forest_1',
    requirements: [], // No requirements, always succeeds
    success: {
      narration: 'You venture into the dark forest. A sense of unease washes over you.',
      attributes: [{ key: 'sanity', value: -5 }],
    },
    failure: { // Unused since there are no requirements
      narration: '',
    },
  },
  'town_1': {
    id: 'town_1',
    requirements: [],
    success: {
      narration: 'You head to the town and find a bustling market. You feel invigorated.',
      attributes: [{ key: 'stamina', value: 10 }],
    },
    failure: {
      narration: '',
    },
  },
  'grab_glimmer': {
    id: 'grab_glimmer',
    requirements: [{ attribute: 'strength', value: 10 }],
    success: {
      narration: 'With a strong pull, you retrieve a rusty, but solid, iron sword from the riverbed!',
      itemsGained: ['item_sword_rusty'],
    },
    failure: {
      narration: 'You reach for the glimmer, but the current is too strong. You lose your footing and swallow some water.',
      attributes: [{ key: 'hp', value: -5 }],
    },
  },
  'rest': {
    id: 'rest',
    requirements: [],
    success: {
      narration: 'You decide to ignore the glimmer and take a short rest, restoring some of your energy.',
      attributes: [{ key: 'hp', value: 10 }, { key: 'stamina', value: 5 }],
    },
    failure: {
      narration: '',
    },
  },
};

// We also need a registry for the items themselves
// In a real game, this would be a large database.
const itemRegistry: Record<string, any> = {
  'item_sword_rusty': {
    id: 'item_sword_rusty',
    name: 'Rusty Sword',
    type: 'Item',
    itemType: 'Equipment',
    description: 'An old, rusty sword. Better than nothing.',
    // ... other equipment properties
  }
};

export const OutcomeRegistry = {
  getOutcome: (id: string): Outcome | undefined => outcomes[id],
  getItem: (id: string): any | undefined => itemRegistry[id],
};
