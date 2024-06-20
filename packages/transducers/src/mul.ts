import type { Reducer } from "./api.js";
import { __mathOp } from "./internal/mathop.js";

/**
 * Reducer to compute product of values with optional `init` value
 * (default: 1).
 */
export function mul(init?: number): Reducer<number, number>;
export function mul(src: Iterable<number>): number;
export function mul(init: number, src: Iterable<number>): number;
export function mul(...args: any[]): any {
	return __mathOp(mul, (acc, x: number) => acc * x, 1, args);
}
