import type { Reducer } from "../api";
import { $$reduce, reducer } from "../reduce";

/**
 * Reducer which ignores incoming values and instead only counts them,
 * optionally using given `start` and `step` counter values.
 *
 * @param offset -
 * @param step -
 */
export function count(offset?: number, step?: number): Reducer<number, any>;
export function count(xs: Iterable<any>): number;
export function count(offset: number, xs: Iterable<any>): number;
export function count(offset: number, step: number, xs: Iterable<any>): number;
export function count(...args: any[]): any {
    const res = $$reduce(count, args);
    if (res !== undefined) {
        return res;
    }
    let offset: number = args[0] || 0;
    let step: number = args[1] || 1;
    return reducer(
        () => offset,
        (acc, _) => acc + step
    );
}
