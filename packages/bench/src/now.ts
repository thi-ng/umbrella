import type { Fn0, FnU2 } from "@thi.ng/api";
import type { Timestamp } from "./api.js";

/**
 * If available, returns wrapper for `process.hrtime.bigint()` else
 * falls back to `Date.now()`. In all cases, returns a nanosec-scale
 * timestamp, either as `bigint` or `number`.
 */
export const now: Fn0<Timestamp> =
    typeof BigInt !== "undefined"
        ? typeof process !== "undefined" &&
          typeof process.hrtime !== "undefined" &&
          typeof process.hrtime.bigint === "function"
            ? () => process.hrtime.bigint()
            : () => BigInt(Date.now() * 1e6)
        : () => Date.now() * 1e6;

/**
 * Returns the difference in milliseconds between 2 given
 * {@link Timestamp}s.
 *
 * @param a
 * @param b
 */
export const timeDiff: FnU2<Timestamp, number> = (a, b) =>
    (typeof BigInt !== "undefined"
        ? Number(<bigint>b - <bigint>a)
        : <number>b - <number>a) * 1e-6;
