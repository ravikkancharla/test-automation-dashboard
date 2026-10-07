import type { TestDefinition } from './types';

export const STORAGE_KEY = 'testdash_runs_v1';
export const MAX_STORED_RUNS = 100;
export const MAX_LISTED_RUNS = 20;
export const MAX_CHARTED_RUNS = 15;
export const FLAKY_WINDOW = 5;

// Representative test suite used to generate realistic-looking fake data.
export const TEST_SUITE: TestDefinition[] = [
  { name: 'auth.login', flakeChance: 0.03 },
  { name: 'auth.logout', flakeChance: 0.01 },
  { name: 'checkout.addToCart', flakeChance: 0.02 },
  { name: 'checkout.applyPromo', flakeChance: 0.18 },
  { name: 'checkout.payment', flakeChance: 0.06 },
  { name: 'api.orders.create', flakeChance: 0.02 },
  { name: 'api.orders.cancel', flakeChance: 0.22 },
  { name: 'api.users.fetch', flakeChance: 0.01 },
  { name: 'search.filterResults', flakeChance: 0.04 },
  { name: 'search.sortResults', flakeChance: 0.02 },
  { name: 'profile.updateAddress', flakeChance: 0.01 },
  { name: 'profile.changePassword', flakeChance: 0.15 },
  { name: 'notifications.email', flakeChance: 0.09 },
  { name: 'notifications.push', flakeChance: 0.03 },
  { name: 'inventory.syncStock', flakeChance: 0.19 },
];
