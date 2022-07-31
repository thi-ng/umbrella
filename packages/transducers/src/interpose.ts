import type { Fn0 } from "@thi.ng/api";
import { isIterable } from "@thi.ng/checks/is-iterable";
import type { Reducer, Transducer } from "./api.js";
import { compR } from "./compr.js";
import { iterator } from "./iterator.js";
import { isReduced } from "./reduced.js";

export function interpose<A, B>(sep: B | Fn0<B>): Transducer<A, A | B>;
export function interpose<A, B>(
	sep: B | Fn0<B>,
	src: Iterable<A>
): IterableIterator<A | B>;
export function interpose<A, B>(sep: any, src?: Iterable<A>): any {
	return isIterable(src)
		? iterator(interpose(sep), src)
		: (rfn: Reducer<any, A | B>) => {
				const r = rfn[2];
				const _sep: Fn0<B> =
					typeof sep === "function" ? sep : () => sep;
				let first = true;
				return compR(rfn, (acc, x: A) => {
					if (first) {
						first = false;
						return r(acc, x);
					}
					acc = r(acc, _sep());
					return isReduced(acc) ? acc : r(acc, x);
				});
		  };
}
