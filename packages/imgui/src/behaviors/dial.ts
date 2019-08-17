import { fit, TAU } from "@thi.ng/math";
import { heading, ReadonlyVec, sub2 } from "@thi.ng/vectors";
import { slider1Val } from "./slider";

export const dialVal = (
    p: ReadonlyVec,
    c: ReadonlyVec,
    startTheta: number,
    thetaGap: number,
    min: number,
    max: number,
    prec: number
) => {
    let theta = heading(sub2([], p, c)) - startTheta;
    theta < -0.5 && (theta += TAU);
    return slider1Val(
        fit(Math.min(theta / (TAU - thetaGap)), 0, 1, min, max),
        min,
        max,
        prec
    );
};
