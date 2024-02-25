import type { Fn } from "@thi.ng/api";
import { isIterable } from "@thi.ng/checks/is-iterable";
import type { Transducer } from "./api.js";
import { comp } from "./comp.js";
import { iterator } from "./iterator.js";
import { mapKeys } from "./map-keys.js";
import { partition } from "./partition.js";
import { partitionOf } from "./partition-of.js";
import { rename } from "./rename.js";

export interface StructField extends Array<any> {
	[0]: string;
	[1]: number;
	[2]?: Fn<any[], any>;
}

/**
 * Higher-order transducer to converts linear input into structured
 * objects using given field specs and ordering.
 *
 * @remarks
 * A single field spec is an array of 2 or 3 items:
 *
 * `[name, size, transform?]`.
 *
 * If `transform` is given, it will be used to produce the final value
 * for this field. In the example below, it is used to unwrap the ID
 * field values, e.g. from `[123] => 123`
 *
 * @example
 * ```ts
 * import { push, struct, transduce } from "@thi.ng/transducers";
 *
 * transduce(
 *     struct([["id", 1, (id) => id[0]], ["pos", 2], ["vel", 2], ["color", 4]]),
 *     push(),
 *     [0, 100, 200, -1, 0, 1, 0.5, 0, 1, 1, 0, 0, 5, 4, 0, 0, 1, 1]
 * )
 * // [ { color: [ 1, 0.5, 0, 1 ],
 * //     vel: [ -1, 0 ],
 * //     pos: [ 100, 200 ],
 * //     id: 0 },
 * //   { color: [ 0, 0, 1, 1 ],
 * //     vel: [ 5, 4 ],
 * //     pos: [ 0, 0 ],
 * //     id: 1 } ]
 * ```
 *
 * @param fields -
 * @param src -
 */
export function struct<T>(fields: StructField[]): Transducer<any, T>;
export function struct<T>(
	fields: StructField[],
	src: Iterable<any>
): IterableIterator<T>;
export function struct(fields: StructField[], src?: Iterable<any>): any {
	return isIterable(src)
		? iterator(struct(fields), src)
		: comp(
				partitionOf(fields.map((f) => f[1])),
				partition(fields.length),
				rename(fields.map((f) => f[0])),
				mapKeys(
					fields.reduce(
						(acc: any, f) =>
							f[2] ? ((acc[f[0]] = f[2]), acc) : acc,
						{}
					),
					false
				)
		  );
}
