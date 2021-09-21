import type { Fn } from "@thi.ng/api";
import { identity } from "@thi.ng/compose/identity";
import type { Reducer } from "./api";
import { count } from "./count";
import { groupByMap } from "./group-by-map";
import { $$reduce } from "./reduce";

export function frequencies<A>(): Reducer<Map<A, number>, A>;
export function frequencies<A>(xs: Iterable<A>): Map<A, number>;
export function frequencies<A, B>(key: Fn<A, B>): Reducer<Map<B, number>, A>;
export function frequencies<A, B>(
    key: Fn<A, B>,
    xs: Iterable<A>
): Map<B, number>;
export function frequencies(...args: any[]): any {
    return (
        $$reduce(frequencies, args) ||
        groupByMap({ key: args[0] || identity, group: count() })
    );
}
