import type { Fn } from "@thi.ng/api";
import type { PackedBuffer } from "@thi.ng/pixel";

export type DitherKernelFactory = Fn<PackedBuffer, DitherKernel>;

export interface DitherKernel {
    ox: number[];
    oy: number[];
    weights: number[];
    shift: number;
    x1?: number;
    x2?: number;
    y1?: number;
    y2?: number;
}

export interface DitherOpts {
    /**
     * Normalized threshold
     *
     * @defaultValue 0.5
     */
    threshold: number;
    /**
     * Error spillage/diffusion factor.
     *
     * @defaultValue 1.0
     */
    bleed: number;
    /**
     * Channel IDs to limit processing (if omittet, all channels will be
     * processed).
     */
    channels: number[];
}

export type BayerSize = 1 | 2 | 4 | 8 | 16 | 32 | 64;

export interface BayerMatrix {
    mat: number[][];
    invSize: number;
    mask: number;
}
