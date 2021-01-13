/**
 * Takes a string, linear index position and optional line split delimiter (or
 * regexp, default: "\n"). Computes and returns position of index as cursor
 * coords tuple: `[line, column]`
 *
 * @remarks
 * By default the returned coords are 1-based, but can be configured via
 * optional `offset` arg (also in `[line,column]` order).
 *
 * @example
 * ```ts
 * computeCursorPos("thi.ng\numbrella", 10);
 * // [ 2, 4 ]
 *
 * // w/ custom offset
 * computeCursorPos("thi.ng\numbrella", 10, "\n", [11, 1]);
 * // [ 12, 4 ]
 * ```
 *
 * @param str -
 * @param pos -
 * @param delim -
 * @param offset -
 */
export const computeCursorPos = (
    str: string,
    pos: number,
    delim: string | RegExp = "\n",
    offset: number[] = [1, 1]
) => {
    if (!str.length) return [1, 1];
    pos = Math.min(Math.max(0, pos), str.length);
    const lines = str.split(delim);
    const n = lines.length;
    for (let i = 0; i < n; i++) {
        const l = lines[i];
        if (pos <= l.length) return [i + offset[0], pos + offset[1]];
        pos -= l.length + 1;
    }
    return [n + offset[0] - 1, offset[1]];
};
