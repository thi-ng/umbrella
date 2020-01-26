const TPL = /\{(\d+)\}/g;

/**
 * Takes a string template with embedded `{number}` style terms and any
 * number of args. Replaces numbered terms with their respective args
 * given.
 *
 * @example
 * ```ts
 * interpolate("let {0}: {2} = {1};", "a", 42, "number")
 * // "let a: number = 42;"
 * ```
 *
 * @param src
 * @param args
 */
export const interpolate = (src: string, ...args: any[]) =>
    args.length > 0
        ? src.replace(TPL, (m) => String(args[parseInt(m[1], 10)]))
        : src;
