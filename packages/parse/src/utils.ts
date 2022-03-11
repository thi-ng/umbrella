// thing:no-export

const cache: string[] = [];

/**
 * Memoized indentation.
 *
 * @param x - 
 *
 * @internal
 */
export const indent = (x: number) => (cache[x] = "  ".repeat(x));
