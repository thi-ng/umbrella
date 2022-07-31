export interface DitherKernel {
	ox: number[];
	oy: number[];
	weights: number[];
	shift: number;
}

export interface DitherOpts {
	/**
	 * Normalized threshold (will be scaled to actual value range of each image
	 * channel). Mainly intended for {@link THRESHOLD}. Due to error diffusion,
	 * for most other dither configuration the theshold can be > 1.
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
