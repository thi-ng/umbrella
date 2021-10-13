import { repeat } from "./repeat.js";

/**
 * Returns a ruler-like string of given `width`, using `a` character for major
 * ticks and `b` for minor ticks.
 *
 * @example
 * ```ts
 * console.log(ruler(40))
 * // |''''|''''|''''|''''|''''|''''|''''|''''
 *
 * console.log(ruler(40, 8, "!", "."))
 * // !.......!.......!.......!.......!.......
 * ```
 *
 * @param width
 * @param major
 * @param a
 * @param b
 */
export const ruler = (width: number, major = 5, a = "|", b = "'") =>
    repeat(a + repeat(b, major - 1), Math.ceil(width / major)).substr(0, width);

/**
 * Returns a grid of given `cols` x `rows` as string, each cell of size `w` x
 * `h`. The optional `chars` can be used to customize the grid.
 *
 * @example
 * ```ts
 * console.log(grid(3, 3, 4, 2));
 * // +---+---+---+
 * // |   |   |   |
 * // +---+---+---+
 * // |   |   |   |
 * // +---+---+---+
 * // |   |   |   |
 * // +---+---+---+
 *
 * console.log(grid(3, 3, 4, 2, "*_/"));
 * // *___*___*___*
 * // /   /   /   /
 * // *___*___*___*
 * // /   /   /   /
 * // *___*___*___*
 * // /   /   /   /
 * // *___*___*___*
 *
 * console.log(grid(3, 2, 3, 3, "+  #"));
 * // +  +  +
 * //  ## ##
 * //  ## ##
 * // +  +  +
 * //  ## ##
 * //  ## ##
 * // +  +  +
 * ```
 *
 * @param cols
 * @param rows
 * @param w
 * @param h
 * @param chars
 */
export const grid = (
    cols: number,
    rows: number,
    w: number,
    h: number,
    [a, b, c, d] = "+-| "
) => {
    const major = ruler(cols * w, w, a, b) + a + "\n";
    const minor = ruler(cols * w, w, c, d) + c + "\n";
    return repeat(major + repeat(minor, h - 1), rows) + major;
};
