// SPDX-License-Identifier: Apache-2.0
import type { Reducer } from "./api.js";
import { __mathOp } from "./internal/mathop.js";

/**
 * Reducer to successively subtract values from optional `init` value
 * (default: 0).
 */
export function sub(init?: number): Reducer<number, number>;
export function sub(src: Iterable<number>): number;
export function sub(init: number, src: Iterable<number>): number;
export function sub(...args: any[]): any {
	return __mathOp(sub, (acc, x: number) => acc - x, 0, args);
}
