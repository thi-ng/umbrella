let M: bigint;

/**
 * If available, returns wrapper for `process.hrtime.bigint()` else
 * falls back to `Date.now()` (scaled to nanoseconds). In all cases,
 * returns a `bigint` timestamp.
 */
export const now =
    typeof BigInt !== "undefined"
        ? typeof process !== "undefined" &&
          typeof process.hrtime !== "undefined" &&
          typeof process.hrtime.bigint === "function"
            ? () => process.hrtime.bigint()
            : ((M = BigInt(1_000_000)), () => BigInt(Date.now()) * M)
        : () => Date.now();
