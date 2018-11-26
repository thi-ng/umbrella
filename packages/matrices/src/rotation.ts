import { sincos } from "@thi.ng/math/angle";
import { Mat } from "./api";
import {
    setValues22,
    setValues23,
    setValues33,
    setValues44
} from "./set-values";

export const rotation22 =
    (m: Mat, theta: number) => {
        const [s, c] = sincos(theta);
        return setValues22(
            m,
            c, s,
            -s, c,
        );
    };

export const rotation23 =
    (m: Mat, theta: number) => {
        const [s, c] = sincos(theta);
        return setValues23(
            m,
            c, s,
            -s, c,
            0, 0
        );
    };

export const rotationX33 =
    (m: Mat, theta: number) => {
        const [s, c] = sincos(theta);
        return setValues33(
            m,
            1, 0, 0,
            0, c, s,
            0, -s, c,
        );
    };

export const rotationY33 =
    (m: Mat, theta: number) => {
        const [s, c] = sincos(theta);
        return setValues33(
            m,
            c, 0, -s,
            0, 1, 0,
            s, 0, c,
        );
    };

export const rotationZ33 =
    (m: Mat, theta: number) => {
        const [s, c] = sincos(theta);
        return setValues33(
            m,
            c, s, 0,
            -s, c, 0,
            0, 0, 1,
        );
    };

export const rotationX44 =
    (m: Mat, theta: number) => {
        const [s, c] = sincos(theta);
        return setValues44(
            m,
            1, 0, 0, 0,
            0, c, s, 0,
            0, -s, c, 0,
            0, 0, 0, 1
        );
    };

export const rotationY44 =
    (m: Mat, theta: number) => {
        const [s, c] = sincos(theta);
        return setValues44(
            m,
            c, 0, -s, 0,
            0, 1, 0, 0,
            s, 0, c, 0,
            0, 0, 0, 1
        );
    };

export const rotationZ44 =
    (m: Mat, theta: number) => {
        const [s, c] = sincos(theta);
        return setValues44(
            m,
            c, s, 0, 0,
            -s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
    };
