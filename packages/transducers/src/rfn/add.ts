import { Reducer } from "../api";
import { $$reduce, reducer } from "../reduce";

/**
 * Reducer to compute sum of values with given `init` value.
 */
export function add(init?: number): Reducer<number, number>;
export function add(xs: Iterable<number>): number;
export function add(init: number, xs: Iterable<number>): number;
export function add(...args: any[]): any {
    const res = $$reduce(add, args);
    if (res !== undefined) {
        return res;
    }
    const init = args[0] || 0;
    return reducer(() => init, (acc, x: number) => acc + x);
}
