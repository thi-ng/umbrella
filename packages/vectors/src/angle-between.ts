import type { FnU2 } from "@thi.ng/api";
import { absInnerAngle } from "@thi.ng/math/angle";
import type { ReadonlyVec } from "./api";
import { cross2 } from "./cross";
import { dot } from "./dot";
import { mag } from "./mag";

export const angleRatio: FnU2<ReadonlyVec, number> = (a, b) =>
    dot(a, b) / (mag(a) * mag(b));

export const angleBetween2 = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    absInner = false
) => {
    const t = Math.atan2(cross2(a, b), dot(a, b));
    return absInner ? absInnerAngle(t) : t;
};

export const angleBetween3 = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    normalize = true,
    absInner = false
) => {
    const t = normalize ? Math.acos(angleRatio(a, b)) : Math.acos(dot(a, b));
    return absInner ? absInnerAngle(t) : t;
};
