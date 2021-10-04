import type { DitherKernelFactory } from "./api";

/**
 * Basic 1D (row-based) error diffusion.
 */
export const DIFFUSION_ROW: DitherKernelFactory = ({ width }) => ({
    ox: [1],
    oy: [0],
    weights: [1],
    shift: 0,
    x2: width - 1,
});

/**
 * Basic 1D (column-based) error diffusion.
 */
export const DIFFUSION_COLUMN: DitherKernelFactory = () => ({
    ox: [0],
    oy: [1],
    weights: [1],
    shift: 0,
});

/**
 * Basic 2D error diffusion
 */
export const DIFFUSION_2D: DitherKernelFactory = ({ width }) => ({
    ox: [1, 0],
    oy: [0, 1],
    weights: [1, 1],
    shift: 1,
    x2: width - 1,
});
