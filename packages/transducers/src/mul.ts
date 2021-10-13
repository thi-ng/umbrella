import type { Reducer } from "./api.js";
import { __mathop } from "./internal/mathop.js";

/**
 * Reducer to compute product of values with optional `init` value
 * (default: 1).
 */
export function mul(init?: number): Reducer<number, number>;
export function mul(xs: Iterable<number>): number;
export function mul(init: number, xs: Iterable<number>): number;
export function mul(...args: any[]): any {
    return __mathop(mul, (acc, x: number) => acc * x, 1, args);
}
