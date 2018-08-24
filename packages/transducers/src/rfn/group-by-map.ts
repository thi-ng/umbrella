import { Reducer, GroupByOpts } from "../api";
import { identity } from "../func/identity";
import { $$reduce, reducer } from "../reduce";
import { push } from "./push";

export function groupByMap<SRC, KEY, GROUP>(opts?: Partial<GroupByOpts<SRC, KEY, GROUP>>): Reducer<Map<KEY, GROUP>, SRC>;
export function groupByMap<SRC, GROUP>(xs: Iterable<SRC>): Map<SRC, GROUP>;
export function groupByMap<SRC, KEY, GROUP>(opts: Partial<GroupByOpts<SRC, KEY, GROUP>>, xs: Iterable<SRC>): Map<KEY, GROUP>;
export function groupByMap<SRC, KEY, GROUP>(...args: any[]): any {
    const res = $$reduce(groupByMap, args);
    if (res !== undefined) {
        return res;
    }
    const opts = <GroupByOpts<SRC, KEY, GROUP>>{
        key: identity,
        group: push(),
        ...args[0]
    };
    const [init, _, reduce] = opts.group; _;
    return reducer<Map<KEY, GROUP>, SRC>(
        () => new Map(),
        (acc, x) => {
            const k = opts.key(x);
            return acc.set(
                k,
                acc.has(k) ?
                    <GROUP>reduce(acc.get(k), x) :
                    <GROUP>reduce(init(), x)
            );
        }
    );
}
