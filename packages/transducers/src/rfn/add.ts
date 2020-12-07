import type { Reducer } from "../api";
import { __mathop } from "../internal/mathop";

/**
 * Reducer to compute sum of values with given `init` value. Default: 0
 */
export function add(init?: number): Reducer<number, number>;
export function add(xs: Iterable<number>): number;
export function add(init: number, xs: Iterable<number>): number;
export function add(...args: any[]): any {
    return __mathop(add, (acc, x: number) => acc + x, 0, args);
}
