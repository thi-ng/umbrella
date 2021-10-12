import type { Fn } from "@thi.ng/api";
import { typedArray, typedArrayType } from "@thi.ng/api/typedarray";
import { quickSort } from "@thi.ng/arrays/quicksort";
import { sortByCachedKey } from "@thi.ng/arrays/sort-cached";
import { swap } from "@thi.ng/arrays/swap";
import { compareNumAsc, compareNumDesc } from "@thi.ng/compare/numeric";
import type { ColorDistance, ReadonlyColor, TypedColor } from "./api";
import { distEucledian3 } from "./distance";
import { intAbgr32Srgb } from "./int/int-srgb";

export const selectChannel = (id: number) => (col: ReadonlyColor) => col[id];

/**
 * Takes a `target` color and optional `distance` function (default:
 * {@link distEucledian3}). Returns a new function which can be used as `key`
 * function for {@link sort} to compute the distance metric of a color to the
 * given `target`.
 *
 * @param target
 * @param dist
 */
export const proximity =
    (target: ReadonlyColor, dist: ColorDistance = distEucledian3) =>
    (col: ReadonlyColor) =>
        dist(target, col);

/**
 * Similar to {@link proximity}, but intended as syntax sugar for {@link ABGR}
 * input colors. The proximity will still be computed using given distance
 * function (default: {@link distEucledian3}) and will be in sRGB space. Hence
 * given `target` color should be provided in the same space too.
 *
 * @param target
 * @param dist
 */
export const proximityABGR32 =
    (target: ReadonlyColor, dist: ColorDistance = distEucledian3) =>
    (col: ReadonlyColor) =>
        dist(target, intAbgr32Srgb([], col[0]));

export const sort = (
    colors: ReadonlyColor[],
    key: Fn<ReadonlyColor, number>,
    isReverse = false
) => sortByCachedKey(colors, key, isReverse ? compareNumDesc : compareNumAsc);

/**
 * Similar to {@link sort}, but only for memory mapped colors (e.g. mapping a
 * pixel buffer). Does NOT change the order of elements in given `colors` array,
 * BUT sorts the **apparent** order by swapping the contents of the backing
 * memory.
 *
 * ```ts
 * // memory buffer of 4 sRGB colors
 * const buf = new Float32Array([0,1,0,1, 0,0.5,0,1, 0,0.25,0,1, 0,0.75,0,1]);
 *
 * // map buffer (creates 4 SRGB instances linked to the buffer)
 * const pix = srgb.mapBuffer(buf);
 *
 * // display original order
 * pix.map(css);
 * // [ '#00ff00', '#008000', '#004000', '#00bf00' ]
 *
 * // sort colors (buffer!) by luminance
 * sortMapped(pix, luminanceSrgb);
 *
 * // new order
 * pix.map(css);
 * // [ '#004000', '#008000', '#00bf00', '#00ff00' ]
 *
 * // buffer contents have been re-ordered
 * buf
 * // Float32Array(16) [
 * //     0, 0.25, 0, 1,    0,
 * //   0.5,    0, 1, 0, 0.75,
 * //     0,    1, 0, 1,    0,
 * //     1
 * // ]
 * ```
 *
 * @param colors
 * @param key
 * @param isReverse
 */
export const sortMapped = <T extends TypedColor<any>>(
    colors: T[],
    key: Fn<ReadonlyColor, number>,
    isReverse = false
) => {
    if (!colors.length) return colors;
    const keys = colors.map(key);
    const tmp = typedArray(typedArrayType(colors[0].buf), colors[0].length);
    quickSort(keys, isReverse ? compareNumDesc : compareNumAsc, (_, x, y) => {
        swap(keys, x, y);
        tmp.set(colors[x]);
        colors[x].set(colors[y]);
        colors[y].set(tmp);
    });
    return colors;
};
