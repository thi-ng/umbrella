import { sincos } from "@thi.ng/math/angle";
import { setC, setC4, setC6 } from "@thi.ng/vectors/setc";
import type { MatOpN } from "./api";

/**
 * Constructs a 2x2 matrix rotation matrix for given `theta`.
 *
 * @param out -
 * @param theta -
 */
export const rotation22: MatOpN = (out, theta) => {
    const [s, c] = sincos(theta);
    return setC4(out || [], c, s, -s, c);
};

/**
 * Constructs a 2x3 matrix rotation matrix for given `theta`.
 *
 * @param out -
 * @param theta -
 */
export const rotation23: MatOpN = (out, theta) => {
    const [s, c] = sincos(theta);
    return setC6(out || [], c, s, -s, c, 0, 0);
};

/**
 * Constructs a 3x3 matrix X rotation matrix for given `theta`.
 *
 * @param out -
 * @param theta -
 */
export const rotationX33: MatOpN = (out, theta) => {
    const [s, c] = sincos(theta);
    return setC(out || [], 1, 0, 0, 0, c, s, 0, -s, c);
};

/**
 * Constructs a 3x3 matrix Y rotation matrix for given `theta`.
 *
 * @param out -
 * @param theta -
 */
export const rotationY33: MatOpN = (out, theta) => {
    const [s, c] = sincos(theta);
    return setC(out || [], c, 0, -s, 0, 1, 0, s, 0, c);
};

/**
 * Constructs a 3x3 matrix Z rotation matrix for given `theta`.
 *
 * @param out -
 * @param theta -
 */
export const rotationZ33: MatOpN = (out, theta) => {
    const [s, c] = sincos(theta);
    return setC(out || [], c, s, 0, -s, c, 0, 0, 0, 1);
};

/**
 * Constructs a 4x4 matrix X rotation matrix for given `theta`.
 *
 * @param out -
 * @param theta -
 */
export const rotationX44: MatOpN = (out, theta) => {
    const [s, c] = sincos(theta);
    return setC(out || [], 1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1);
};

/**
 * Constructs a 4x4 matrix Y rotation matrix for given `theta`.
 *
 * @param out -
 * @param theta -
 */
export const rotationY44: MatOpN = (out, theta) => {
    const [s, c] = sincos(theta);
    return setC(out || [], c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1);
};

/**
 * Constructs a 4x4 matrix Z rotation matrix for given `theta`.
 *
 * @param out -
 * @param theta -
 */
export const rotationZ44: MatOpN = (out, theta) => {
    const [s, c] = sincos(theta);
    return setC(out || [], c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
};
