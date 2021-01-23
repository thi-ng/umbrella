import type { ColorOp } from "./api";
import { mulV33 } from "./internal/matrix-ops";

const M = [
    0.2104542553,
    1.9779984951,
    0.0259040371,
    0.793617785,
    -2.428592205,
    0.7827717662,
    -0.0040720468,
    0.4505937099,
    -0.808675766,
];

/**
 * @remarks
 * Reference: https://bottosson.github.io/posts/oklab/
 *
 * @param out
 * @param src
 */
export const rgbaOklab: ColorOp = (out, [r, g, b, alpha]) =>
    mulV33(
        out,
        M,
        [
            Math.cbrt(0.412165612 * r + 0.536275208 * g + 0.0514575653 * b),
            Math.cbrt(0.211859107 * r + 0.6807189584 * g + 0.107406579 * b),
            Math.cbrt(0.0883097947 * r + 0.2818474174 * g + 0.6302613616 * b),
            alpha,
        ],
        false
    );
