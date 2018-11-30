import { ReadonlyVec, Vec } from "./api";
import { maddN } from "./maddn";
import { mulN } from "./muln";

export const addWeighted2 =
    (out: Vec, a: ReadonlyVec, b: ReadonlyVec, wa: number, wb: number) =>
        maddN(out,
            mulN(out, a, wa),
            b, wb);

export const addWeighted3 =
    (out: Vec, a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, wa: number, wb: number, wc: number) =>
        maddN(out,
            maddN(out,
                mulN(out, a, wa),
                b, wb),
            c, wc);

export const addWeighted4 =
    (out: Vec, a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, d: ReadonlyVec,
        wa: number, wb: number, wc: number, wd: number) =>
        maddN(out,
            maddN(out,
                maddN(out,
                    mulN(out, a, wa), b, wb),
                c, wc),
            d, wd);

export const addWeighted5 =
    (out: Vec, a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, d: ReadonlyVec, e: ReadonlyVec,
        wa: number, wb: number, wc: number, wd: number, we: number) =>
        maddN(out,
            maddN(out,
                maddN(out,
                    maddN(out,
                        mulN(out, a, wa), b, wb),
                    c, wc),
                d, wd),
            e, we);
