/**
 * Takes a string, linear index position and optional line split
 * delimiter (or regexp, default: "\n"). Computes and returns position
 * of index as 1-based cursor coords tuple: `[line, column]`
 *
 * @example
 * ```ts
 * computeCursorPos("thi.ng\numbrella", 10);
 * // [ 2, 4 ]
 * ```
 *
 * @param str -
 * @param pos -
 * @param delim -
 */
export const computeCursorPos = (
    str: string,
    pos: number,
    delim: string | RegExp = "\n"
) => {
    if (!str.length) return [1, 1];
    pos = Math.min(Math.max(0, pos), str.length);
    const lines = str.split(delim);
    const n = lines.length;
    for (let i = 0; i < n; i++) {
        const l = lines[i];
        if (pos <= l.length) return [i + 1, pos + 1];
        pos -= l.length + 1;
    }
    return [n, 1];
};
