import type { GroupByOpts, Reducer } from "../api";
import { __groupByOpts } from "../internal/group-opts";
import { $$reduce } from "../reduce";

// prettier-ignore
export function groupByMap<SRC, KEY, GROUP>(opts?: Partial<GroupByOpts<SRC, KEY, GROUP>>): Reducer<Map<KEY, GROUP>, SRC>;
export function groupByMap<SRC, GROUP>(xs: Iterable<SRC>): Map<SRC, GROUP>;
// prettier-ignore
export function groupByMap<SRC, KEY, GROUP>(opts: Partial<GroupByOpts<SRC, KEY, GROUP>>, xs: Iterable<SRC>): Map<KEY, GROUP>;
export function groupByMap<SRC, KEY, GROUP>(...args: any[]): any {
    const res = $$reduce(groupByMap, args);
    if (res !== undefined) {
        return res;
    }
    const opts = __groupByOpts<SRC, KEY, GROUP>(args[0]);
    const [init, complete, reduce] = opts.group;
    return <Reducer<Map<KEY, GROUP>, SRC>>[
        () => new Map(),
        (acc) => {
            for (let k of acc.keys()) {
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
