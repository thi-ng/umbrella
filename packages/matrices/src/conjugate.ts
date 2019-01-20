import { ReadonlyVec, setC4, Vec } from "@thi.ng/vectors3";

export const conjugateQ =
    (out: Vec, a: ReadonlyVec) =>
        setC4(
            out || a,
            -a[0],
            -a[1],
            -a[2],
            a[3]
        );
