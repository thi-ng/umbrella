import { HALF_PI, PI } from "@thi.ng/math";
import { addmN } from "./addmn";
import { VecOpRoVV, VecOpVVV } from "./api";
import { headingXY } from "./heading";
import { normalize } from "./normalize";
import { sub } from "./sub";

export const bisect2: VecOpRoVV<number> = (a, b) => {
    const theta = (headingXY(a) + headingXY(b)) / 2;
    return theta <= HALF_PI ? theta : PI - theta;
};

/**
 * Returns normalized bisector vector for point `b` in the triangle `a`
 * -> `b` -> `c`. If `out` is null, creates a new result vector.
 *
 * @param out -
 * @param a -
 * @param b -
 * @param c -
 */
export const cornerBisector: VecOpVVV = (out, a, b, c) => (
    !out && (out = []),
    normalize(
        out,
        addmN(
            out,
            normalize(out, sub(out, a, b)),
            normalize(null, sub([], c, b)),
            0.5
        )
    )
);
