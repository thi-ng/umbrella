// SPDX-License-Identifier: Apache-2.0
import type { GroupByOpts, Reducer } from "./api.js";
import { __groupByOpts } from "./internal/group-opts.js";
import { $$reduce } from "./reduce.js";

export function groupByMap<SRC, KEY, GROUP>(
	opts?: Partial<GroupByOpts<SRC, KEY, GROUP>>
): Reducer<SRC, Map<KEY, GROUP>>;
export function groupByMap<SRC, GROUP>(src: Iterable<SRC>): Map<SRC, GROUP>;
export function groupByMap<SRC, KEY, GROUP>(
	opts: Partial<GroupByOpts<SRC, KEY, GROUP>>,
	src: Iterable<SRC>
): Map<KEY, GROUP>;
export function groupByMap<SRC, KEY, GROUP>(...args: any[]): any {
	const res = $$reduce(groupByMap, args);
	if (res !== undefined) return res;

	const opts = __groupByOpts<SRC, KEY, GROUP>(args[0]);
	const [init, complete, reduce] = opts.group;
	return <Reducer<SRC, Map<KEY, GROUP>>>[
		() => new Map(),
		(acc) => {
			for (const k of acc.keys()) {
				acc.set(k, complete(acc.get(k)!));
			}
			return acc;
		},
		(acc, x) => {
			const k = opts.key(x);
			return acc.set(
				k,
				acc.has(k)
					? <GROUP>reduce(acc.get(k)!, x)
					: <GROUP>reduce(init(), x)
			);
		},
	];
}
