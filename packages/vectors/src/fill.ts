import type { IVector } from "./api";
import { mapV } from "./map";
import { set } from "./set";

/**
 * Fills Vec2/3/4 view based buffer, supporting arbitrary component and
 * element layouts of both the input and output buffers. The `out`
 * vector is used as write cursor over the underlying buffer and will be
 * filled with the components of vector `v`.
 *
 * @example
 * ```ts
 * fill(
 *   new Vec2(new Float32Array(12)),
 *   new Vec2([1, 2]),
 *   3, // num elements
 *   4  // stride
 * )
 * // Float32Array [1, 2, 0, 0, 1, 2, 0, 0, 1, 2, 0, 0]
 * ```
 *
 * @param out - target vector / wrapped buffer
 * @param v - fill vector
 * @param num - number of elements to fill
 * @param so - output stride
 */
export const fill = (
    out: IVector<any>,
    v: IVector<any>,
    num: number,
    so = out.length * out.stride
) => mapV(set.impl(v.length), out, v, num, so, 0);
