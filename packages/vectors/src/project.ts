import type { ReadonlyVec, Vec } from "./api.js";
import { dot } from "./dot.js";
import { magSq } from "./magsq.js";
import { mulN } from "./muln.js";

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
