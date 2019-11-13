import { identity } from "@thi.ng/compose";
import { GroupByOpts } from "../api";
import { push } from "../rfn/push";

/**
 * Shared helper function for groupBy* reducers
 *
 * @param opts -
 */
export const __groupByOpts = <SRC, KEY, GROUP>(
    opts?: Partial<GroupByOpts<SRC, PropertyKey, GROUP>>
) =>
    <GroupByOpts<SRC, KEY, GROUP>>{
        key: identity,
        group: push(),
        ...opts
    };
