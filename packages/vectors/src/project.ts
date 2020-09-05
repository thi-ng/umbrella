import type { ReadonlyVec, Vec } from "./api";
import { dot } from "./dot";
import { magSq } from "./magsq";
import { mulN } from "./muln";

/**
 * Returns vector projection of `v` onto `dir`.
 *
 * {@link https://en.wikipedia.org/wiki/Vector_projection}
 *
 * @param v -
 * @param dir -
 */
export const project = (out: Vec, v: ReadonlyVec, dir: ReadonlyVec) =>
    mulN(out || v, dir, dot(v, dir) / magSq(dir));
