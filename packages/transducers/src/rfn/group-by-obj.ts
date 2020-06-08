import { __groupByOpts } from "../internal/group-opts";
import { $$reduce } from "../reduce";
import type { IObjectOf } from "@thi.ng/api";
import type { GroupByOpts, Reducer } from "../api";

// prettier-ignore
export function groupByObj<SRC, GROUP>(opts?: Partial<GroupByOpts<SRC, PropertyKey, GROUP>>): Reducer<IObjectOf<GROUP>, SRC>;
export function groupByObj<SRC>(xs: Iterable<SRC>): IObjectOf<SRC[]>;
// prettier-ignore
export function groupByObj<SRC, GROUP>(opts: Partial<GroupByOpts<SRC, PropertyKey, GROUP>>, xs: Iterable<SRC>): IObjectOf<GROUP>;
export function groupByObj<SRC, GROUP>(...args: any[]): any {
    const res = $$reduce(groupByObj, args);
    if (res) {
        return res;
    }
    const opts = __groupByOpts<SRC, PropertyKey, GROUP>(args[0]);
    const [_init, complete, _reduce] = opts.group;
    return <Reducer<IObjectOf<GROUP>, SRC>>[
        () => ({}),
        (acc) => {
            for (let k in acc) {
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
