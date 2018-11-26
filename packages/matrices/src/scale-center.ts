import { ReadonlyVec } from "@thi.ng/vectors3/api";
import { mulN2, mulN3 } from "@thi.ng/vectors3/muln";
import { Mat } from "./api";
import { concat } from "./concat";
import { scale23, scale44 } from "./scale";
import { translation23, translation44 } from "./translation";

export const scaleWithCenter23 = (m: Mat, p: ReadonlyVec, s: number | ReadonlyVec) =>
    concat(
        translation23(m, p),
        scale23([], s),
        translation23([], mulN2([], p, -1))
    );

export const scaleWithCenter44 = (m: Mat, p: ReadonlyVec, s: number | ReadonlyVec) =>
    concat(
        translation44(m, p),
        scale44([], s),
        translation44([], mulN3([], p, -1))
    );
