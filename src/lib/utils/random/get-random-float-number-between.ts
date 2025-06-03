import { getRandomNumberBetween } from './get-random-number-between.js';

export function getRandomFloatNumberBetween(lower: number, upper: number): number {
  const min = Math.ceil(lower * 10);
  const max = Math.floor(upper * 10);
  const value = getRandomNumberBetween(min, max);
  return value / 10;
}
