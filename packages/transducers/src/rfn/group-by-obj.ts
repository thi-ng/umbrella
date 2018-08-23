import { IObjectOf } from "@thi.ng/api/api";

import { GroupByOpts, Reducer } from "../api";
import { identity } from "../func/identity";
import { reducer, $$reduce } from "../reduce";
import { push } from "./push";

export function groupByObj<SRC, GROUP>(opts?: Partial<GroupByOpts<SRC, PropertyKey, GROUP>>): Reducer<IObjectOf<GROUP>, SRC>;
export function groupByObj<SRC>(xs: Iterable<SRC>): IObjectOf<SRC[]>;
export function groupByObj<SRC, GROUP>(opts: Partial<GroupByOpts<SRC, PropertyKey, GROUP>>, xs: Iterable<SRC>): IObjectOf<GROUP>;
export function groupByObj<SRC, GROUP>(...args: any[]): any {
    const res = $$reduce(groupByObj, args);
    if (res) {
        return res;
    }
    const _opts = <GroupByOpts<SRC, PropertyKey, GROUP>>{
        key: identity,
        group: push(),
        ...args[0]
    };
    const [_init, _, _reduce] = _opts.group; _;
    return reducer(
        () => ({}),
        (acc, x: SRC) => {
            const k: any = _opts.key(x);
            acc[k] = acc[k] ?
                <GROUP>_reduce(acc[k], x) :
                <GROUP>_reduce(_init(), x);
            return acc;
        }
    );
}
