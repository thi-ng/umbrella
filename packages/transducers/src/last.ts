import { NO_OP } from "@thi.ng/api/api";
import type { Reducer } from "./api.js";
import { reduce, reducer } from "./reduce.js";

export function last<T>(): Reducer<T, T>;
export function last<T>(xs: Iterable<T>): T;
export function last<T>(xs?: Iterable<T>): any {
	return xs ? reduce(last(), xs) : reducer<T, T>(<any>NO_OP, (_, x) => x);
}
