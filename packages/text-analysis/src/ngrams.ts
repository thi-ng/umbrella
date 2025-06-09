import { identity } from "@thi.ng/api/fn";
import { isIterable } from "@thi.ng/checks/is-iterable";
import type { Transducer } from "@thi.ng/transducers";
import { comp } from "@thi.ng/transducers/comp";
import { flatten1 } from "@thi.ng/transducers/flatten1";
import { iterator, iterator1 } from "@thi.ng/transducers/iterator";
import { join } from "@thi.ng/transducers/join";
import { keep } from "@thi.ng/transducers/keep";
import { map } from "@thi.ng/transducers/map";
import { multiplex } from "@thi.ng/transducers/multiplex";
import { partition } from "@thi.ng/transducers/partition";

/**
 * Transducer which emits ngrams of received input tokens.
 *
 * @remarks
 * Also see {@link withNgrams}.
 *
 * @example
 * ```ts
 * import { ngrams } from "@thi.ng/text-analysis";
 *
 * console.log([...ngrams(2, " ", ["wish", "you", "were", "here"])]);
 * // [ "wish you", "you were", "were here" ]
 * ```
 *
 * @param n
 * @param sep
 */
export function ngrams(n: number, sep?: string): Transducer<string, string>;
export function ngrams(
	n: number,
	sep: string,
	src: Iterable<string>
): IterableIterator<string>;
export function ngrams(n: number, sep = " ", src?: Iterable<string>) {
	return isIterable(src)
		? iterator1(ngrams(n, sep), src)
		: comp(partition(n, 1), join(sep));
}

/**
 * Transducer which emits original input tokens with their interleaved ngrams.
 *
 * @remarks
 * Also see {@link ngrams} to ONLY produce a sequence of ngrams.
 *
 * @example
 * ```ts
 * import { withNgrams } from "@thi.ng/text-analysis";
 *
 * console.log([...withNgrams(2, " ", ["wish", "you", "were", "here"])]);
 * // [ "wish", "you", "wish you", "were", "you were", "here", "were here" ]
 * ```
 *
 * @param n
 * @param sep
 */
export function withNgrams(n: number, sep?: string): Transducer<string, string>;
export function withNgrams(
	n: number,
	sep: string,
	src: Iterable<string>
): IterableIterator<string>;
export function withNgrams(n: number, sep = " ", src?: Iterable<string>) {
	return isIterable(src)
		? iterator(withNgrams(n, sep), src)
		: comp(multiplex(map(identity), ngrams(n)), flatten1(), keep());
}
