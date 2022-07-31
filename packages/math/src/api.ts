export const PI = Math.PI;
export const TAU = PI * 2;
export const HALF_PI = PI / 2;
export const THIRD_PI = PI / 3;
export const QUARTER_PI = PI / 4;
export const SIXTH_PI = PI / 6;

export const INV_PI = 1 / PI;
export const INV_TAU = 1 / TAU;
export const INV_HALF_PI = 1 / HALF_PI;

export const DEG2RAD = PI / 180;
export const RAD2DEG = 180 / PI;

export const PHI = (1 + Math.sqrt(5)) / 2;

export const SQRT2 = Math.SQRT2;
export const SQRT3 = Math.sqrt(3);
export const SQRT2_2 = SQRT2 / 2;
export const SQRT3_2 = SQRT3 / 2;

export const THIRD = 1 / 3;
export const TWO_THIRD = 2 / 3;
export const SIXTH = 1 / 6;

export let EPS = 1e-6;

export type Crossing =
	/**
	 * lines A & B are equal
	 */
	| "equal"
	/**
	 * lines A & B are flat (all same values)
	 */
	| "flat"
	/**
	 * line A crossed under B
	 */
	| "under"
	/**
	 * line A crossed over B
	 */
	| "over"
	| "other";
