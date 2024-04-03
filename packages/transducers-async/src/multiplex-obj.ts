import type { IObjectOf } from "@thi.ng/api";
import { rename } from "@thi.ng/transducers/rename";
import type {
	AsyncMultiplexTxLike,
	AsyncReducer,
	AsyncTransducer,
} from "./api.js";
import { comp } from "./comp.js";
import { __iter } from "./iterator.js";
import { multiplex } from "./multiplex.js";

export function multiplexObj<A, B>(
	xforms: IObjectOf<AsyncMultiplexTxLike<A, any>>,
	rfn?: AsyncReducer<B, [PropertyKey, any]>
): AsyncTransducer<A, B>;
export function multiplexObj<A, B>(
	xforms: IObjectOf<AsyncMultiplexTxLike<A, any>>,
	src: Iterable<A>
): IterableIterator<B>;
export function multiplexObj<A, B>(
	xforms: IObjectOf<AsyncMultiplexTxLike<A, any>>,
	rfn: AsyncReducer<B, [PropertyKey, any]>,
	src: Iterable<A>
): IterableIterator<B>;
export function multiplexObj(...args: any[]): any {
	const iter = __iter(multiplexObj, args);
	if (iter) {
		return iter;
	}
	const [xforms, rfn] = args;
	const ks = Object.keys(xforms);
	return comp(
		multiplex.apply(null, <any>ks.map((k) => xforms[k])),
		rename(ks, rfn)
	);
}
