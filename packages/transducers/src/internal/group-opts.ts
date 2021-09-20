import type { GroupByOpts } from "../api";
import { push } from "../push";

/**
 * Shared helper function for `groupBy*` reducers
 *
 * @param opts -
 *
 * @internal
 */
export const __groupByOpts = <SRC, KEY, GROUP>(
    opts?: Partial<GroupByOpts<SRC, PropertyKey, GROUP>>
) =>
    <GroupByOpts<SRC, KEY, GROUP>>{
        key: (x: any) => x,
        group: push(),
        ...opts,
    };
