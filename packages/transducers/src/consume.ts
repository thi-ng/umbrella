// SPDX-License-Identifier: Apache-2.0
/**
 * Consumes given iterable, presumably for any implicit side-effects. Iterable
 * MUST be finite!
 *
 * @remarks
 * See {@link run} for a similar approach when also side-effecting transducers
 * should be applied.
 *
 * @example
 * ```ts tangle:../export/consume.ts
 * import { consume, repeatedly2d } from "@thi.ng/transducers";
 *
 * // iterators are lazy, no logging will actually be performed yet
 * const iter = repeatedly2d((x, y) => console.log("output:", [x, y]), 2, 3);
 *
 * // force evaluation, discard any results
 * consume(iter);
 * // output: [ 0, 0 ]
 * // output: [ 1, 0 ]
 * // output: [ 0, 1 ]
 * // output: [ 1, 1 ]
 * // output: [ 0, 2 ]
 * // output: [ 1, 2 ]
 * ```
 *
 * @param src
 */
export const consume = (src: Iterable<any>) => {
	for (let _ of src);
};
