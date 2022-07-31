import { isIterable } from "@thi.ng/checks/is-iterable";
import type { Transducer, TransformSpec } from "./api.js";
import { deepTransform } from "./deep-transform.js";
import { iterator1 } from "./iterator.js";
import { map } from "./map.js";

/**
 * Transducer. Same as `map(deepTransform(spec))`
 *
 * See {@link deepTransform} for details.
 *
 * @param spec -
 * @param src -
 */
export function mapDeep(spec: TransformSpec): Transducer<any, any>;
export function mapDeep(
	spec: TransformSpec,
	src: Iterable<any>
): IterableIterator<any>;
export function mapDeep(spec: TransformSpec, src?: Iterable<any>): any {
	return isIterable(src)
		? iterator1(mapDeep(spec), src)
		: map(deepTransform(spec));
}
