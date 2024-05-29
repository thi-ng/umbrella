import { NO_OP } from "@thi.ng/api/api";
import type { Reducer } from "./api.js";
import { reduce, reducer } from "./reduce.js";

export function last<T>(): Reducer<T, T>;
export function last<T>(src: Iterable<T>): T;
export function last<T>(src?: Iterable<T>): any {
	return src ? reduce(last(), src) : reducer<T, T>(<any>NO_OP, (_, x) => x);
}
