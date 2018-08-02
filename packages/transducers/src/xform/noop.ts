import { Transducer } from "../api";

/**
 * No-op / pass-through transducer, essentially the same as:
 * `map(identity)`, but faster. Useful for testing and / or to keep
 * existing values in a `multiplex()` tuple lane.
 */
export function noop<T>(): Transducer<T, T> {
    return (rfn) => rfn;
}
