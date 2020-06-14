import { identity } from "@thi.ng/compose";
import { push } from "../rfn/push";
import type { GroupByOpts } from "../api";

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
        key: identity,
        group: push(),
        ...opts,
    };
