import type { DitherKernel } from "./api.js";

const A = 64 / 48;
const B = 3 * A;
const C = 5 * A;
const D = 7 * A;

/**
 * Jarvis-Judice-Ninke dither kernel.
 *
 * @remarks
 * References:
 * - https://en.wikipedia.org/wiki/Error_diffusion#minimized_average_error
 * - https://tannerhelland.com/2012/12/28/dithering-eleven-algorithms-source-code.html
 */
export const JARVIS_JUDICE_NINKE: DitherKernel = {
    ox: [1, 2, -2, -1, 0, 1, 2, -2, -1, 0, 1, 2],
    oy: [0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
    weights: [D, C, B, C, D, C, B, A, B, C, B, A],
    shift: 6,
};
