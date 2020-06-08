import { max, min, Vec, VecPair } from "@thi.ng/vectors";

/**
 * Computes the nD bounds of given vectors. `vmin` should be initialized
 * to `+∞` and `vmax` to `-∞` (e.g. use copies of `MIN*` / `MAX*`
 * constants defined in thi.ng/vectors).
 *
 * @example
 * ```ts
 * points = [[-1,-2], [5,-3], [0,4]];
 *
 * bounds(points, [...MAX2], [...MIN2])
 * // [[-1,-3],[5,4]]
 * ```
 *
 * Returns 2-tuple of modified `[vmin, vmax]`.
 *
 * @param pts - point
 * @param vmin - min result (pre-initialized to `+∞`)
 * @param vmax - max result (pre-initialized to `-∞`)
 */
export const bounds = (
    pts: ReadonlyArray<Vec>,
    vmin: Vec,
    vmax: Vec
): VecPair => {
    for (let i = pts.length; --i >= 0; ) {
        const p = pts[i];
        min(null, vmin, p);
        max(null, vmax, p);
    }
    return [vmin, vmax];
};
