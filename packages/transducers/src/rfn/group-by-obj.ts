import { IObjectOf } from "@thi.ng/api";
import { GroupByOpts, Reducer } from "../api";
import { __groupByOpts } from "../internal/group-opts";
import { $$reduce, reducer } from "../reduce";

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
    const [_init, _, _reduce] = opts.group;
    _; // ignore
    return reducer<IObjectOf<GROUP>, SRC>(
        () => ({}),
        (acc, x: SRC) => {
            const k: any = opts.key(x);
            acc[k] = acc[k]
                ? <GROUP>_reduce(acc[k], x)
                : <GROUP>_reduce(_init(), x);
            return acc;
        }
    );
}
