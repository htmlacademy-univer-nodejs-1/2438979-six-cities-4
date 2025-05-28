type ParsedCommandCollection = Record<string, string[]>;

export function parseCommandLine(argv: string[]): ParsedCommandCollection {
  const result: ParsedCommandCollection = {};
  let currentKey: string | null = null;

  for (const arg of argv) {
    if (arg.startsWith('--')) {
      currentKey = arg;
      if (!result[currentKey]) {
        result[currentKey] = [];
      }
    } else if (currentKey) {
      result[currentKey].push(arg);
    }
  }

  return result;
}
