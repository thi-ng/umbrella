import type { FnU5 } from "@thi.ng/api";
import { setC4 } from "@thi.ng/vectors/setc";
import { xyzD65, XYZD65 } from "./xyz65.js";

/**
 * Computes XYZA for given wavelength (in nanometers) and optional alpha channel
 * (default: 1), writes result into `out` (or a new array if null).
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/CIE_1931_color_space#Analytical_approximation
 *
 * Primary hues (approx. wavelengths):
 *
 * - 460 => blue
 * - 490 => cyan
 * - 530 => green
 * - 570 => yellow
 * - 610 => red
 *
 * @param out - 
 * @param lambda - 
 * @param alpha - 
 */
export const wavelengthXyz = (
    out: XYZD65 | null,
    lambda: number,
    alpha = 1
) => {
    lambda *= 10;
    return <XYZD65>(
        setC4(
            out || xyzD65(),
            gaussian(lambda, 1.056, 5998, 379, 310) +
                gaussian(lambda, 0.362, 4420, 160, 267) +
                gaussian(lambda, -0.065, 5011, 204, 262),
            gaussian(lambda, 0.821, 5688, 469, 405) +
                gaussian(lambda, 0.286, 5309, 163, 311),
            gaussian(lambda, 1.217, 4370, 118, 360) +
                gaussian(lambda, 0.681, 4590, 260, 138),
            alpha
        )
    );
};

const gaussian: FnU5<number> = (x, alpha, m, s1, s2) => {
    const t = (x - m) / (x < m ? s1 : s2);
    return alpha * Math.exp(-(t * t) / 2);
};
