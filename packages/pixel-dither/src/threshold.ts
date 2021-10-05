import type { DitherKernel } from "./api";

/**
 * Basic 1x1 thresold dither kernel
 */
export const THRESHOLD: DitherKernel = {
    ox: [],
    oy: [],
    weights: [],
    shift: 0,
};
