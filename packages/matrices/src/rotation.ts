import { sincos } from "@thi.ng/math/angle";
import { setC, setC4, setC6 } from "@thi.ng/vectors3/setc";
import { Mat } from "./api";

export const rotation22 =
    (m: Mat, theta: number) => {
        const [s, c] = sincos(theta);
        return setC4(
            m || [],
            c, s,
            -s, c,
        );
    };

export const rotation23 =
    (m: Mat, theta: number) => {
        const [s, c] = sincos(theta);
        return setC6(
            m || [],
            c, s,
            -s, c,
            0, 0
        );
    };

export const rotationX33 =
    (m: Mat, theta: number) => {
        const [s, c] = sincos(theta);
        return setC(
            m || [],
            1, 0, 0,
            0, c, s,
            0, -s, c,
        );
    };

export const rotationY33 =
    (m: Mat, theta: number) => {
        const [s, c] = sincos(theta);
        return setC(
            m || [],
            c, 0, -s,
            0, 1, 0,
            s, 0, c,
        );
    };

export const rotationZ33 =
    (m: Mat, theta: number) => {
        const [s, c] = sincos(theta);
        return setC(
            m || [],
            c, s, 0,
            -s, c, 0,
            0, 0, 1,
        );
    };

export const rotationX44 =
    (m: Mat, theta: number) => {
        const [s, c] = sincos(theta);
        return setC(
            m || [],
            1, 0, 0, 0,
            0, c, s, 0,
            0, -s, c, 0,
            0, 0, 0, 1
        );
    };

export const rotationY44 =
    (m: Mat, theta: number) => {
        const [s, c] = sincos(theta);
        return setC(
            m || [],
            c, 0, -s, 0,
            0, 1, 0, 0,
            s, 0, c, 0,
            0, 0, 0, 1
        );
    };

export const rotationZ44 =
    (m: Mat, theta: number) => {
        const [s, c] = sincos(theta);
        return setC(
            m || [],
            c, s, 0, 0,
            -s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
    };
