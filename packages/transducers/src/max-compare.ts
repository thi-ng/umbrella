import type { Comparator, Fn0, Nullable } from "@thi.ng/api";
import type { Reducer } from "./api.js";
import { __compareOp } from "./internal/mathop.js";

export function maxCompare<T>(init: Fn0<T>, cmp?: Comparator<T>): Reducer<T, T>;
export function maxCompare<T>(init: Fn0<T>, src: Iterable<T>): T;
export function maxCompare<T>(
	init: Fn0<T>,
	cmp: Nullable<Comparator<T>>,
	src: Iterable<T>
): T;
export function maxCompare(...args: any[]): any {
	return __compareOp(maxCompare, args, 1);
}
