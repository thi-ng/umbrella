import { Reducer } from "../api";
import { $$reduce, reducer } from "../reduce";

/**
 * Reducer to compute product of values with optional `init` value
 * (default: 1).
 */
export function mul(init?: number): Reducer<number, number>;
export function mul(xs: Iterable<number>): number;
export function mul(init: number, xs: Iterable<number>): number;
export function mul(...args: any[]): any {
    const res = $$reduce(mul, args);
    if (res !== undefined) {
        return res;
    }
    const init = args[0] || 1;
    return reducer(() => init, (acc, x: number) => acc * x);
}
