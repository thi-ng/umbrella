import { Reducer } from "../api";
import { $$reduce, reducer } from "../reduce";

/**
 * Reducer to successively subtract values from optional `init` value
 * (default: 0).
 */
export function sub(init?: number): Reducer<number, number>;
export function sub(xs: Iterable<number>): number;
export function sub(init: number, xs: Iterable<number>): number;
export function sub(...args: any[]): any {
    const res = $$reduce(sub, args);
    if (res !== undefined) {
        return res;
    }
    const init = args[0] || 0;
    return reducer(() => init, (acc, x: number) => acc - x);
}
