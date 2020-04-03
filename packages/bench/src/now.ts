/**
 * If available, returns wrapper for `process.hrtime.bigint()` else
 * falls back to `Date.now()`. In all cases, returns a nanosec-scale
 * timestamp, either as `bigint` or `number`.
 */
export const now =
    typeof BigInt !== "undefined"
        ? typeof process !== "undefined" &&
          typeof process.hrtime !== "undefined" &&
          typeof process.hrtime.bigint === "function"
            ? () => process.hrtime.bigint()
            : () => BigInt(Date.now() * 1e6)
        : () => Date.now() * 1e6;
