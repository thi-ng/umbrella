import type { Reducer } from "./api.js";
import { __mathOp } from "./internal/mathop.js";

/**
 * Reducer to compute sum of values with given `init` value. Default: 0
 */
export function add(init?: number): Reducer<number, number>;
export function add(src: Iterable<number>): number;
export function add(init: number, src: Iterable<number>): number;
export function add(...args: any[]): any {
	return __mathOp(add, (acc, x: number) => acc + x, 0, args);
}
