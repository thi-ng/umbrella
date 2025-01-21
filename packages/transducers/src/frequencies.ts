// SPDX-License-Identifier: Apache-2.0
import type { Fn } from "@thi.ng/api";
import { identity } from "@thi.ng/compose/identity";
import type { Reducer } from "./api.js";
import { count } from "./count.js";
import { groupByMap } from "./group-by-map.js";
import { $$reduce } from "./reduce.js";

export function frequencies<A>(): Reducer<A, Map<A, number>>;
export function frequencies<A>(src: Iterable<A>): Map<A, number>;
export function frequencies<A, B>(key: Fn<A, B>): Reducer<A, Map<B, number>>;
export function frequencies<A, B>(
	key: Fn<A, B>,
	src: Iterable<A>
): Map<B, number>;
export function frequencies(...args: any[]): any {
	return (
		$$reduce(frequencies, args) ||
		groupByMap({ key: args[0] || identity, group: count() })
	);
}
