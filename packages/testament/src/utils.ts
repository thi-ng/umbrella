import type { Fn0, Fn2, Timestamp } from "./api";

/**
 * @remarks
 * Copied from thi.ng/checks to avoid circular deps
 *
 * @param x
 *
 * @internal
 */
export const isString = (x: any): x is string => typeof x === "string";

/**
 * If available, returns wrapper for `process.hrtime.bigint()` else
 * falls back to `Date.now()`. In all cases, returns a nanosec-scale
 * timestamp, either as `bigint` or `number`.
 *
 * @remarks
 * Copied from thi.ng/bench to avoid circular deps
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
 * Returns the (rounded) difference in milliseconds between two given
 * {@link Timestamp}s.
 *
 * @remarks
 * Based on / copied from thi.ng/bench to avoid circular deps
 *
 * @param a
 * @param b
 */
export const timeDiff: Fn2<Timestamp, Timestamp, number> = (a, b) =>
    Math.round(
        (typeof BigInt !== "undefined"
            ? Number(<bigint>b - <bigint>a)
            : <number>b - <number>a) * 1e-6
    );
