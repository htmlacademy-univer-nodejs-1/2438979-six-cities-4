export function getRandomNumberBetween(lower: number, upper: number): number {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

export function getRandomBoolean(): boolean {
  return getRandomNumberBetween(0, 1) === 1;
}

export function getRandomFloatNumberBetween(lower: number, upper: number): number {
  const min = Math.ceil(lower * 10);
  const max = Math.floor(upper * 10);
  const value = getRandomNumberBetween(min, max);
  return value / 10;
}

export function getRandomItem<T>(items: T[]): T {
  const index = getRandomNumberBetween(0, items.length - 1);
  return items[index];
}

export function getRandomSubarray<T>(items: T[]): T[] {
  const count = getRandomNumberBetween(1, items.length);
  return [...items]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}
