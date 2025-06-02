import { getRandomNumberBetween } from './get-random-number-between.js';

export function getRandomSubarray<T>(items: T[]): T[] {
  const count = getRandomNumberBetween(1, items.length);
  return [...items]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}
