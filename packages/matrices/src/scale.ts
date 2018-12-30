import { isNumber } from "@thi.ng/checks/is-number";
import { ReadonlyVec } from "@thi.ng/vectors3/api";
import { setC, setC4 } from "@thi.ng/vectors3/setc";
import { Mat } from "./api";

export const scale22 =
    (m: Mat, s: number | ReadonlyVec) => (
        s = isNumber(s) ? [s, s] : s,
        setC4(
            m || [],
            s[0], 0,
            0, s[1]
        )
    );

export const scale23 =
    (m: Mat, s: number | ReadonlyVec) => (
        s = isNumber(s) ? [s, s] : s,
        setC(
            m || [],
            s[0], 0,
            0, s[1],
            0, 0
        )
    );

export const scale33 =
    (m: Mat, s: number | ReadonlyVec) => (
        s = isNumber(s) ? [s, s, s] : s,
        setC(
            m || [],
            s[0], 0, 0,
            0, s[1], 0,
            0, 0, s[2]
        )
    );

export const scale44 =
    (m: Mat, s: number | ReadonlyVec) => (
        s = isNumber(s) ? [s, s, s] : s,
        setC(
            m || [],
            s[0], 0, 0, 0,
            0, s[1], 0, 0,
            0, 0, s[2], 0,
            0, 0, 0, s[3] !== undefined ? s[3] : 1
        )
    );
