const cache: string[] = [];

/**
 * Memoized indentation.
 *
 * @param x
 *
 * @internal
 */
export const indent = (x: number) =>
    x > 0 ? cache[x] || (cache[x] = "  ".repeat(x)) : "";
