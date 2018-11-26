import { isNumber } from "@thi.ng/checks/is-number";
import { ReadonlyVec } from "@thi.ng/vectors3/api";
import { Mat } from "./api";
import {
    setValues22,
    setValues23,
    setValues33,
    setValues44
} from "./set-values";

export const scale22 =
    (m: Mat, s: number | ReadonlyVec) => (
        s = isNumber(s) ? [s, s] : s,
        setValues22(
            m,
            s[0], 0,
            0, s[1]
        )
    );

export const scale23 =
    (m: Mat, s: number | ReadonlyVec) => (
        s = isNumber(s) ? [s, s] : s,
        setValues23(
            m,
            s[0], 0,
            0, s[1],
            0, 0
        )
    );

export const scale33 =
    (m: Mat, s: number | ReadonlyVec) => (
        s = isNumber(s) ? [s, s, s] : s,
        setValues33(
            m,
            s[0], 0, 0,
            0, s[1], 0,
            0, 0, s[2]
        )
    );

export const scale44 =
    (m: Mat, s: number | ReadonlyVec) => (
        s = isNumber(s) ? [s, s, s] : s,
        setValues44(
            m,
            s[0], 0, 0, 0,
            0, s[1], 0, 0,
            0, 0, s[2], 0,
            0, 0, 0, s[3] !== undefined ? s[3] : 1
        )
    );
