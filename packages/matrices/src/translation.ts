import { ReadonlyVec } from "@thi.ng/vectors3/api";
import { Mat } from "./api";
import { setValues23, setValues44 } from "./set-values";

export const translation23 =
    (m: Mat, v: ReadonlyVec) =>
        setValues23(m || [], 1, 0, 0, 1, v[0], v[1]);

export const translation44 =
    (m: Mat, v: ReadonlyVec) =>
        setValues44(m,
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            v[0], v[1], v[2], 1,
        );
