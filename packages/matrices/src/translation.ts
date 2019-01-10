import { ReadonlyVec, setC, setC6 } from "@thi.ng/vectors3";
import { Mat } from "./api";

export const translation23 =
    (m: Mat, v: ReadonlyVec) =>
        setC6(m || [], 1, 0, 0, 1, v[0], v[1]);

export const translation44 =
    (m: Mat, v: ReadonlyVec) =>
        setC(
            m || [],
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            v[0], v[1], v[2], 1,
        );
