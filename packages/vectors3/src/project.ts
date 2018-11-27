import { ReadonlyVec, Vec } from "./api";
import { dot } from "./dot";
import { magSq } from "./magsq";
import { mulN } from "./muln";

/**
 * Returns vector projection of `v` onto `dir`.
 *
 * https://en.wikipedia.org/wiki/Vector_projection
 *
 * @param dir
 * @param v
 */
export const project =
    (out: Vec, dir: ReadonlyVec, v: ReadonlyVec) =>
        mulN(out, dir, dot(v, dir) / magSq(dir));
