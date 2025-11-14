// SPDX-License-Identifier: Apache-2.0
import type { IObjectOf } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import type { Reducer, Transducer } from "./api.js";
import { comp } from "./comp.js";
import { filter } from "./filter.js";
import { __iter } from "./iterator.js";
import { map } from "./map.js";
import { renamer } from "./renamer.js";
import { transduce } from "./transduce.js";

/**
 * Transducer. Takes an object of key mappings and returns function applying
 * these mapping/renames.
 *
 * @remarks
 * Keys in `kmap` are the new/renamed keys, their values the original names. For
 * keys which simply should be kept, but not renamed, set their value to `true`.
 *
 * @param kmap
 * @param rfn
 */
export function rename<A, B>(
	kmap: IObjectOf<PropertyKey | boolean> | Array<PropertyKey>,
	rfn?: Reducer<[PropertyKey, any], B>
): Transducer<A[], B>;
export function rename<A, B>(
	kmap: IObjectOf<PropertyKey | boolean> | Array<PropertyKey>,
	rfn: Reducer<[PropertyKey, any], B>,
	src: Iterable<A[]>
): IterableIterator<B>;
export function rename<A, B>(...args: any[]): any {
	const iter = args.length > 2 && __iter(rename, args);
	if (iter) {
		return iter;
	}
	let [kmap, reducer] = args;
	if (isArray(kmap)) {
		kmap = kmap.reduce((acc, k, i) => ((acc[k] = i), acc), {});
	}
	if (reducer) {
		const ks = Object.keys(kmap);
		return map((y: A) =>
			transduce(
				comp(
					map(
						(k: PropertyKey) =>
							<[PropertyKey, any]>[k, (<any>y)[kmap[k]]]
					),
					filter((x) => x[1] !== undefined)
				),
				<Reducer<[PropertyKey, any], B>>reducer,
				ks
			)
		);
	} else {
		return map(renamer(<IObjectOf<PropertyKey>>kmap));
	}
}
