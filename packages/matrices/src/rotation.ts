import { sincos } from "@thi.ng/math";
import { setC, setC4, setC6 } from "@thi.ng/vectors";
import { Mat } from "./api";

/**
 * Constructs a M22 rotation matrix for given `theta`.
 *
 * @param out
 * @param theta
 */
export const rotation22 = (out: Mat, theta: number) => {
    const [s, c] = sincos(theta);
    return setC4(out || [], c, s, -s, c);
};

/**
 * Constructs a M23 rotation matrix for given `theta`.
 *
 * @param out
 * @param theta
 */
export const rotation23 = (out: Mat, theta: number) => {
    const [s, c] = sincos(theta);
    return setC6(out || [], c, s, -s, c, 0, 0);
};

/**
 * Constructs a M33 X rotation matrix for given `theta`.
 *
 * @param out
 * @param theta
 */
export const rotationX33 = (out: Mat, theta: number) => {
    const [s, c] = sincos(theta);
    return setC(out || [], 1, 0, 0, 0, c, s, 0, -s, c);
};

/**
 * Constructs a M33 Y rotation matrix for given `theta`.
 *
 * @param out
 * @param theta
 */
export const rotationY33 = (out: Mat, theta: number) => {
    const [s, c] = sincos(theta);
    return setC(out || [], c, 0, -s, 0, 1, 0, s, 0, c);
};

/**
 * Constructs a M33 Z rotation matrix for given `theta`.
 *
 * @param out
 * @param theta
 */
export const rotationZ33 = (out: Mat, theta: number) => {
    const [s, c] = sincos(theta);
    return setC(out || [], c, s, 0, -s, c, 0, 0, 0, 1);
};

/**
 * Constructs a M44 X rotation matrix for given `theta`.
 *
 * @param out
 * @param theta
 */
export const rotationX44 = (out: Mat, theta: number) => {
    const [s, c] = sincos(theta);
    return setC(out || [], 1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1);
};

/**
 * Constructs a M44 Y rotation matrix for given `theta`.
 *
 * @param out
 * @param theta
 */
export const rotationY44 = (out: Mat, theta: number) => {
    const [s, c] = sincos(theta);
    return setC(out || [], c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1);
};

/**
 * Constructs a M44 Z rotation matrix for given `theta`.
 *
 * @param out
 * @param theta
 */
export const rotationZ44 = (out: Mat, theta: number) => {
    const [s, c] = sincos(theta);
    return setC(out || [], c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
};
