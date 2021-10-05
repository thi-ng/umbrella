import type { DitherKernel } from "./api";

/**
 * (Frankie) Sierra's 2-row dither kernel.
 *
 * @remarks
 * References:
 * - https://tannerhelland.com/2012/12/28/dithering-eleven-algorithms-source-code.html
 */
export const SIERRA2: DitherKernel = {
    ox: [1, 2, -2, -1, 0, 1, 2],
    oy: [0, 0, 1, 1, 1, 1, 1],
    weights: [4, 3, 1, 2, 3, 2, 1],
    shift: 4,
};
