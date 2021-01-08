const RE = /\x1b\[[0-9;]+m/g;

/**
 * Removes all ANSI control sequences from given string.
 *
 * @example
 * ```ts
 * stripAnsi("\x1B[32mhello\x1B[0m \x1B[91mworld\x1B[0m!"");
 * // 'hello world!'
 * ```
 *
 * @param x
 */
export const stripAnsi = (x: string) => x.replace(RE, "");

/**
 * Returns length of `x` excluding any ANSI control sequences (via
 * {@link stripAnsi}).
 *
 * @param x
 */
export const lengthAnsi = (x: string) => stripAnsi(x).length;
