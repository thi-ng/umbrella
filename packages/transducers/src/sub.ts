import type { Reducer } from "./api.js";
import { __mathop } from "./internal/mathop.js";

/**
 * Reducer to successively subtract values from optional `init` value
 * (default: 0).
 */
export function sub(init?: number): Reducer<number, number>;
export function sub(xs: Iterable<number>): number;
export function sub(init: number, xs: Iterable<number>): number;
export function sub(...args: any[]): any {
    return __mathop(sub, (acc, x: number) => acc - x, 0, args);
}
