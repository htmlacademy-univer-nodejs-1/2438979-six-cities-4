import { getRandomNumberBetween } from './get-random-number-between.js';

export function getRandomBoolean(): boolean {
  return getRandomNumberBetween(0, 1) === 1;
}
