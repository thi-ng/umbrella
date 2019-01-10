import {
    cross3,
    dot3,
    normalize,
    ReadonlyVec,
    setC,
    sub3
} from "@thi.ng/vectors3";
import { Mat } from "./api";

export const lookAt = (
    out: Mat,
    eye: ReadonlyVec,
    target: ReadonlyVec,
    up: ReadonlyVec) => {

    const z = normalize(null, sub3([], eye, target));
    const x = normalize(null, cross3([], up, z));
    const y = normalize(null, cross3([], z, x));

    return setC(
        out || [],
        x[0], y[0], z[0], 0,
        x[1], y[1], z[1], 0,
        x[2], y[2], z[2], 0,
        -dot3(eye, x), -dot3(eye, y), -dot3(eye, z), 1,
    );
};
