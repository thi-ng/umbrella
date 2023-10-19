/**
 * Consumes given iterable, presumably for any implicit side-effects. Iterable
 * MUST be finite!
 *
 * @remarks
 * See {@link run} for a similar approach when also side-effecting transducers
 * should be applied.
 *
 * @example
 * ```ts
 * consume(repeatedly2d((x, y) => console.log("output:", [x, y]), 2, 3));
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
