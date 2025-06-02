import { getRandomNumberBetween } from './get-random-number-between.js';

export function getRandomItem<T>(items: T[]): T {
  const index = getRandomNumberBetween(0, items.length - 1);
  return items[index];
}
