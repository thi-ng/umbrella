import { compare } from "@thi.ng/compare/compare";
import type { SortOpts } from "../api.js";

/**
 * Helper function to inject default {@link SortOpts}.
 *
 * @param opts -
 *
 * @internal
 */
export const __sortOpts = <A, B>(opts?: Partial<SortOpts<A, B>>) =>
    <SortOpts<A, B>>{
        key: (x: any) => x,
        compare,
        ...opts,
    };
