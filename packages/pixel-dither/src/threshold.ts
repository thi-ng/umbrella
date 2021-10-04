import type { DitherKernelFactory } from "./api";

/**
 * Basic 1x1 thresold dither kernel
 */
export const THRESHOLD: DitherKernelFactory = () => ({
    ox: [],
    oy: [],
    weights: [],
    shift: 0,
});
