// SPDX-License-Identifier: Apache-2.0
// thing:no-export

/** @internal */
const CACHE: string[] = [];

/**
 * Memoized indentation.
 *
 * @param x -
 *
 * @internal
 */
export const __indent = (x: number) => (CACHE[x] = "  ".repeat(x));
