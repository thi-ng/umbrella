import { setVV16, setVV4, setVV6, setVV9 } from "@thi.ng/vectors/setvv";

/**
 * Initializes 2x2 matrix from 2D column vectors.
 *
 * @param out -
 * @param x -
 * @param y -
 */
export const mat22v = setVV4;

/**
 * Initializes 2x3 matrix (affine transform) from 2D column vectors.
 *
 * @param out -
 * @param x -
 * @param y -
 * @param translate -
 */
export const mat23v = setVV6;

/**
 * Initializes 3x3 matrix from 3D column vectors.
 *
 * @param out -
 * @param x -
 * @param y -
 * @param z -
 */
export const mat33v = setVV9;

/**
 * Initializes 4x4 matrix from 4D column vectors.
 *
 * @param out -
 * @param x -
 * @param y -
 * @param z -
 * @param w -
 */
export const mat44v = setVV16;
