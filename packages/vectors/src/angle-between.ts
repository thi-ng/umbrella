import { ReadonlyVec } from "./api";
import { dot } from "./dot";
import { mag } from "./mag";
import { cross2 } from "./cross";

export const angleRatio =
    (a: ReadonlyVec, b: ReadonlyVec) =>
        dot(a, b) / (mag(a) * mag(b));

export const angleBetween2 =
    (a: ReadonlyVec, b: ReadonlyVec) =>
        Math.atan2(cross2(a, b), dot(a, b));

export const angleBetween3 =
    (a: ReadonlyVec, b: ReadonlyVec, normalize = true) =>
        normalize ?
            Math.acos(angleRatio(a, b)) :
            Math.acos(dot(a, b));
