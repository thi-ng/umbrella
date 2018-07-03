import { isArray } from "@thi.ng/checks/is-array";
import { ensureIterable } from "./ensure-iterable";

/**
 * Helper function to avoid unnecessary copying if `x` is already an
 * array. First checks if `x` is an array and if so returns it. Else
 * attempts to obtain an iterator from `x` and if successful collects it
 * as array and returns it. Throws error if `x` isn't iterable.
 *
 * @param x
 */
export function ensureArray(x: any): any[] {
    return isArray(x) ? x : [...ensureIterable(x)];
}
