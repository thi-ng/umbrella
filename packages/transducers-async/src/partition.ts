import type { MaybeAsyncIterable } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
import { unreduced } from "@thi.ng/transducers/reduced";
import type { AsyncReducer, AsyncTransducer } from "./api.js";
import { __iter, iterator } from "./iterator.js";

export function partition<T>(size: number): AsyncTransducer<T, T[]>;
export function partition<T>(
	size: number,
	all: boolean
): AsyncTransducer<T, T[]>;
export function partition<T>(
	size: number,
	step: number
): AsyncTransducer<T, T[]>;
export function partition<T>(
	size: number,
	step: number,
	all: boolean
): AsyncTransducer<T, T[]>;
export function partition<T>(
	size: number,
	src: MaybeAsyncIterable<T>
): AsyncIterableIterator<T[]>;
export function partition<T>(
	size: number,
	all: boolean,
	src: MaybeAsyncIterable<T>
): AsyncIterableIterator<T[]>;
export function partition<T>(
	size: number,
	step: number,
	src: MaybeAsyncIterable<T>
): AsyncIterableIterator<T[]>;
export function partition<T>(
	size: number,
	step: number,
	all: boolean,
	src: MaybeAsyncIterable<T>
): AsyncIterableIterator<T[]>;
export function partition<T>(...args: any[]): any {
	const iter = __iter(partition, args, iterator);
	if (iter) return iter;
	let size = args[0],
		all: boolean,
		step: number;
	if (isNumber(args[1])) {
		step = args[1];
		all = args[2];
	} else {
		step = size;
		all = args[1];
	}
	return ([init, complete, reduce]: AsyncReducer<T[], any>): AsyncReducer<
		T,
		any
	> => {
		let buf: T[] = [];
		let skip = 0;
		return [
			init,
			async (acc) => {
				if (all && buf.length > 0) {
					acc = unreduced(await reduce(acc, buf));
					buf = [];
				}
				return await complete(acc);
			},
			async (acc, x) => {
				if (skip <= 0) {
					if (buf.length < size) {
						buf.push(x);
					}
					if (buf.length === size) {
						acc = await reduce(acc, buf);
						buf = step < size ? buf.slice(step) : [];
						skip = step - size;
					}
				} else {
					skip--;
				}
				return acc;
			},
		];
	};
}
