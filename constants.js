/**
 *
 * Make sure that NUM_DAYS_IN_ROW is a factor of NUM_DAYS_IN_A_GAME otherwise the board won't be even and bad things that i haven't checked for will probably happen.
 *
 */

// Quick and filty solution to give people on mobile a chance.
// export const NUM_DAYS_IN_ROW = window.innerWidth > 500 ? 10 : 5;
// export const NUM_DAYS_IN_GAME = window.innerWidth > 500 ? 100 : 100;
export const NUM_DAYS_IN_ROW = 10;
export const NUM_DAYS_IN_GAME = 100;

export const DIRECTIONS = [
  'west',
  'northWest',
  'north',
  'northEast',
  'east',
  'southEast',
  'south',
  'southWest',
];
