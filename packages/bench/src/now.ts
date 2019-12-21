/**
 * If available, returns wrapper for `process.hrtime.bigint()` else
 * falls back to `Date.now()` (scaled to nanoseconds). In all cases,
 * returns a `bigint` timestamp.
 */
export const now =
    typeof process !== "undefined" &&
    typeof process.hrtime !== "undefined" &&
    typeof process.hrtime.bigint === "function"
        ? () => process.hrtime.bigint()
        : () => BigInt(Date.now()) * 1_000_000n;
