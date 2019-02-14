import { THIRD_PI } from "@thi.ng/math";
import {
    maddN2,
    mag,
    normalize,
    perpendicularLeft2,
    sub2,
    Vec
} from "@thi.ng/vectors";

export const equilateralTriangle2 =
    (a: Vec, b: Vec) => {
        const dir = sub2([], b, a);
        const c = normalize(null, perpendicularLeft2([], dir), mag(dir) * Math.sin(THIRD_PI));
        return [a, b, maddN2(null, c, dir, 0.5)];
    };
