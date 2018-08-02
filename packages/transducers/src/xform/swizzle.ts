import { Transducer } from "../api";
import { swizzler } from "../func/swizzler";
import { map } from "./map";

/**
 * Transducer which performs value reordering on inputs using provided
 * property order. Accepts arrays or objects as input, but always yields
 * arrays.
 *
 * Also see `swizzler()` for standalone (non-transducer) usage.
 *
 * ```
 * [...iterator(swizzle([3,0,2,1]), [[1,2,3,4], [10,20,30,40]])]
 * // [ [ 4, 1, 3, 2 ], [ 40, 10, 30, 20 ] ]
 *
 * [...iterator(swizzle([0,0,1,1]), [[1,2,3,4], [10,20,30,40]])]
 * // [ [ 1, 1, 2, 2 ], [ 10, 10, 20, 20 ] ]
 *
 * [...iterator(swizzle(["z","x"]), [{x: 1, y: 2, z: 3}])]
 * // [ [ 3, 1 ] ]
 * ```
 *
 * @param order key order
 */
export function swizzle<T>(order: PropertyKey[]): Transducer<T, any[]> {
    return map(swizzler(order));
}
