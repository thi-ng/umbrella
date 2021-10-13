import type { Transducer } from "./api.js";

/**
 * No-op / pass-through transducer, essentially the same as:
 * `map((x) => x)`, but faster. Useful for testing and / or to keep
 * existing values in a {@link (multiplex:1)} tuple lane.
 */
export const noop =
    <T>(): Transducer<T, T> =>
    (rfn) =>
        rfn;
