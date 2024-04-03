import type { Reducer } from "./api.js";
import { reducer } from "./reduce.js";

export function str(sep?: string): Reducer<any, string>;
export function str(sep: string, xs: Iterable<any>): string;
export function str(sep?: string, xs?: Iterable<any>): any {
	sep = sep || "";
	let first = true;
	return xs
		? [...xs].join(sep)
		: reducer<any, string>(
				() => "",
				(acc, x) => (
					(acc = first ? acc + x : acc + sep + x),
					(first = false),
					acc
				)
		  );
}
