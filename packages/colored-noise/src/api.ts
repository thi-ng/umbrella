import type { INorm } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";

export interface ColoredNoiseOpts {
	/**
	 * Number of spectral accumulation bins.
	 *
	 * @remarks
	 * This option will be ignored by the {@link white} noise generator.
	 *
	 * Default value for {@link pink} noise is 8, for others 2.
	 */
	bins: number;
	/**
	 * Amplitude scale factor.
	 *
	 * @defaultValue 1
	 */
	scale: number;
	/**
	 * PRNG implementation (see thi.ng/random for further details & implementations)
	 *
	 * @default SYSTEM (aka Math.random)
	 */
	rnd: INorm;
}

export const DEFAULT_OPTS: ColoredNoiseOpts = {
	bins: 2,
	scale: 1,
	rnd: SYSTEM,
};
