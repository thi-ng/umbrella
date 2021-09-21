import type { CommonOpts } from "./api";
import { __optsWithID } from "./idgen";
import { fromIterableSync } from "./iterable";
import type { Stream } from "./stream";

/**
 * Utility stream. Returns a new stream which emits a single value `x` (if
 * given) and then closes. If no arg is provided, the stream emits a single
 * `true`.
 *
 * @remarks
 * Syntax sugar for {@link fromIterableSync}.
 *
 * @param x -
 * @param opts -
 */
export function trigger(): Stream<boolean>;
export function trigger<T>(x: T, opts?: Partial<CommonOpts>): Stream<T>;
export function trigger(x: any = true, opts?: Partial<CommonOpts>) {
    return fromIterableSync([x], __optsWithID("trigger", opts));
}
