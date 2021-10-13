import type { NumericArray } from "@thi.ng/api";
import type { Reducer } from "./api.js";
import { $$reduce, reducer } from "./reduce.js";

/**
 * Reducer which starts filling array with results from given `start`
 * index (default: 0). Use {@link (fillN:1)} for typed array targets
 * (same impl, but provides correct result type).
 *
 * @param start -
 */
export function fill<T>(start?: number): Reducer<T[], T>;
export function fill<T>(xs: Iterable<T>): T[];
export function fill<T>(start: number, xs: Iterable<T>): T[];
export function fill<T>(...args: any[]): any {
    const res = $$reduce(fill, args);
    if (res !== undefined) {
        return res;
    }
    let start = args[0] || 0;
    return reducer<T[], T>(
        () => [],
        (acc, x) => ((acc[start++] = x), acc)
    );
}

/**
 * Like {@link (fill:1)} reducer, but for numeric arrays (incl. typed
 * arrays).
 *
 * @param start -
 */
export function fillN(start?: number): Reducer<NumericArray, number>;
export function fillN(xs: Iterable<number>): NumericArray;
export function fillN(start: number, xs: Iterable<number>): NumericArray;
export function fillN(...args: any[]): any {
    return fill(...args);
}
