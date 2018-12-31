import { ReadonlyVec } from "@thi.ng/vectors3/api";
import { neg } from "@thi.ng/vectors3/neg";
import { Mat } from "./api";
import { concat } from "./concat";
import { scale23, scale44 } from "./scale";
import { translation23, translation44 } from "./translation";

export const scaleWithCenter23 = (m: Mat, p: ReadonlyVec, s: number | ReadonlyVec) =>
    concat(
        m,
        translation23([], p),
        scale23([], s),
        translation23([], neg([], p))
    );

export const scaleWithCenter44 = (m: Mat, p: ReadonlyVec, s: number | ReadonlyVec) =>
    concat(
        m,
        translation44([], p),
        scale44([], s),
        translation44([], neg([], p))
    );
