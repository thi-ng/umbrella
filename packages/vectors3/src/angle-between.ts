import { absTheta } from "@thi.ng/math";
import { ReadonlyVec } from "./api";
import { dot } from "./dot";
import { mag } from "./mag";

export const angleRatio =
    (a: ReadonlyVec, b: ReadonlyVec) =>
        dot(a, b) / (mag(a) * mag(b));

export const angleBetween =
    (a: ReadonlyVec, b: ReadonlyVec, normalize = true) =>
        absTheta(
            normalize ?
                Math.acos(angleRatio(a, b)) :
                Math.acos(dot(a, b))
        );
