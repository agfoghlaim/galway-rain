import {NUM_DAYS_IN_ROW, NUM_DAYS_IN_GAME } from './constants';

export function niceDate(string, short = false) {
  // todo: think toDateString() is one of these!
  const dateInFormatFirefoxLikes = string.replace(/-/g, '/');
  if (short) {
    // eg March 21
    return new Date(dateInFormatFirefoxLikes).toString().substring(4, 10);
  } else {
    // eg Mon Mar 01 2010
    return new Date(dateInFormatFirefoxLikes).toString().substring(0, 15);
  }
}
export function sweeperDate(string) {
  const dateInFormatFirefoxLikes = string.replace(/-/g, '/');

  // eg 11 Feb 18
  return new Date(dateInFormatFirefoxLikes)
    .toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: '2-digit',
    });
}

/**
 * Shuffles array in place. ES6 version. Copied from stack overflow.
 * @link https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 */
export function shuffleArray(a) {
	for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}



/**
 * ==============
 * Util functions
 * ==============
 *
 */
function isLeft(num) {
  return num % NUM_DAYS_IN_ROW === 0;
}
function isRight(num) {
  return num % NUM_DAYS_IN_ROW === NUM_DAYS_IN_ROW - 1;
}
function isTop(num) {
  // console.log(`is top checking ${num} returning ${num < NUM_DAYS_IN_ROW}`);
  return num < NUM_DAYS_IN_ROW;
}
function isBottom(num) {
  return num >= NUM_DAYS_IN_GAME - NUM_DAYS_IN_ROW;
}
export function getNeighbourToThe(i, direction) {
  const neighbours = {
    west: i - 1,
    northWest: i - NUM_DAYS_IN_ROW - 1,
    north: i - NUM_DAYS_IN_ROW,
    northEast: i - (NUM_DAYS_IN_ROW - 1),
    east: i + 1,
    southEast: i + NUM_DAYS_IN_ROW + 1,
    south: i + NUM_DAYS_IN_ROW,
    southWest: i + (NUM_DAYS_IN_ROW - 1),
  };
  return neighbours[direction];
}



export function shouldCheckInThisDirection(i) {
  /**
   * if seeking square to the west, don't check if current square is @ left of the board or square[0]
   * if seeking square to the north-west, don't check if current square is @ left of the board or on the top row or is square[0]...etc.
   */
  return {
    west: () => !isLeft(i) && i > 0,
    northWest: () => !isLeft(i) && i > 0 && !isTop(i),
    north: () => !isTop(i) && i > 0,
    northEast: () => !isTop(i) && i > 0 && !isRight(i),
    east: () => !isRight(i),
    southEast: () => !isRight(i) && !isBottom(i),
    south: () => !isBottom(i),
    southWest: () => !isBottom(i) && !isLeft(i),
  };
}

export function hasNastyNeighbour(i, direction, days) {
  /**
   * Every square has up to 8 neighbours, one in every direction.
   * For example if there are 5 squares in each row... some square (square[i]'s) neighbours going from west clockwise around to south-west will be:
   * west: i-1
   * north-west: i-6 [ i - NUM_DAYS_IN_ROW - 1]
   * north: i-5 [i - NUM_DAYS_IN_ROW ]
   * north-east: i-4, [i - (NUM_DAYS_IN_ROW - 1)]
   * east: i+1,
   * south-east: i+6, [i + NUM_DAYS_IN_ROW + 1]
   * south: i+5, [i + NUM_DAYS_IN_ROW ]
   * south-west: i+4 [ i + (NUM_DAYS_IN_ROW - 1) ]
   * */

  const neighbours = {
    west: i - 1,
    northWest: i - NUM_DAYS_IN_ROW - 1,
    north: i - NUM_DAYS_IN_ROW,
    northEast: i - (NUM_DAYS_IN_ROW - 1),
    east: i + 1,
    southEast: i + NUM_DAYS_IN_ROW + 1,
    south: i + NUM_DAYS_IN_ROW,
    southWest: i + (NUM_DAYS_IN_ROW - 1),
  };

  const relevantNeighbourIndex = neighbours[direction];

  return days[relevantNeighbourIndex].rain > 0;
}