import { THIRD_PI } from "@thi.ng/math";
import {
    maddN2,
    mag,
    normalize,
    perpendicularCCW,
    sub2,
    Vec,
} from "@thi.ng/vectors";

export const equilateralTriangle2 = (a: Vec, b: Vec) => {
    const dir = sub2([], b, a);
    const c = normalize(
        null,
        perpendicularCCW([], dir),
        mag(dir) * Math.sin(THIRD_PI)
    );
    return [a, b, maddN2(null, dir, 0.5, c)];
};
