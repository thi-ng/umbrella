import type { ReadonlyVec, Vec } from "./api";
import { normalize } from "./normalize";
import { sub } from "./sub";

/**
 * Computes direction vector `a` -> `b`, normalized to length `n`
 * (default 1).
 *
 * @param a -
 * @param b -
 * @param n -
 */
export const direction = (
    out: Vec | null,
    a: ReadonlyVec,
    b: ReadonlyVec,
    n = 1
) => normalize(null, sub(out || a, b, a), n);
