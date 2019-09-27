import { ReadonlyVec, setC, setC6 } from "@thi.ng/vectors";
import { Mat } from "./api";

/**
 * Constructs a 2x3 translation matrix.
 *
 * @param out
 * @param v
 */
export const translation23 = (m: Mat | null, v: ReadonlyVec) =>
    setC6(m || [], 1, 0, 0, 1, v[0], v[1]);

/**
 * Constructs a 4x4 translation matrix.
 *
 * @param out
 * @param v
 */
export const translation44 = (m: Mat | null, v: ReadonlyVec) =>
    setC(m || [], 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, v[0], v[1], v[2], 1);
