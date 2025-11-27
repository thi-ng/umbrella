// SPDX-License-Identifier: Apache-2.0
import type { IObjectOf } from "@thi.ng/api";
import type { GroupByOpts, Reducer } from "./api.js";
import { __groupByOpts } from "./internal/group-opts.js";
import { $$reduce } from "./reduce.js";

/**
 * Reducer. Groups inputs, optionally by given key fn and custom reducer. By
 * default the values are used as key directly and {@link push} is used as
 * default reducer.
 *
 * @example
 * ```ts tangle:../export/group-by-obj.ts
 * import { groupByObj } from "@thi.ng/transducers";
 *
 * console.log(
 *   groupByObj(
 *     // group items by first char
 *     { key: (x) => x[0] },
 *     ["alma", "charlie", "brontë", "anna", "cora", "aurora"]
 *   )
 * );
 * // {
 * //   a: [ "alma", "anna", "aurora" ],
 * //   c: [ "charlie", "cora" ],
 * //   b: [ "brontë" ],
 * // }
 * ```
 *
 * @example
 * ```ts tangle:../export/group-by-obj-2.ts
 * import { conj, groupByObj, repeatedly } from "@thi.ng/transducers";
 *
 * console.log(
 *   groupByObj(
 *     {
 *       // bin items by multiples of 10
 *       key: (x) => Math.floor(x / 10) * 10,
 *       // keep only uniques (using conj reducer)
 *       group: conj(),
 *     },
 *     repeatedly(() => Math.floor(Math.random() * 100), 20)
 *   )
 * );
 * // {
 * //   "0":  Set(1) { 8 },
 * //   "10": Set(1) { 13 },
 * //   "20": Set(2) { 24, 22 },
 * //   "30": Set(2) { 38, 36 },
 * //   "50": Set(5) { 54, 53, 52, 56, 59 },
 * //   "60": Set(2) { 63, 60 },
 * //   "70": Set(4) { 79, 71, 74, 78 },
 * //   "80": Set(2) { 85, 81 },
 * // }
 * ```
 *
 * @param opts
 */
export function groupByObj<SRC, GROUP>(
	opts?: Partial<GroupByOpts<SRC, PropertyKey, GROUP>>
): Reducer<SRC, IObjectOf<GROUP>>;
export function groupByObj<SRC>(src: Iterable<SRC>): IObjectOf<SRC[]>;
export function groupByObj<SRC, GROUP>(
	opts: Partial<GroupByOpts<SRC, PropertyKey, GROUP>>,
	src: Iterable<SRC>
): IObjectOf<GROUP>;
export function groupByObj<SRC, GROUP>(...args: any[]): any {
	const res = $$reduce(groupByObj, args);
	if (res) return res;

	const opts = __groupByOpts<SRC, PropertyKey, GROUP>(args[0]);
	const [_init, complete, _reduce] = opts.group;
	return <Reducer<SRC, IObjectOf<GROUP>>>[
		() => ({}),
		(acc) => {
			for (const k in acc) {
				acc[k] = complete(acc[k]);
			}
			return acc;
		},
		(acc, x: SRC) => {
			const k: any = opts.key(x);
			acc[k] = acc[k]
				? <GROUP>_reduce(acc[k], x)
				: <GROUP>_reduce(_init(), x);
			return acc;
		},
	];
}
