import { clamp01 } from "@thi.ng/math/interval";

const G = 1 / 2.2;

/**
 * Using simplified approximation only - precision not needed for this use case.
 *
 * @internal
 */
export const __toLinear = (x: number, shift = 0) =>
	(((x >> shift) & 0xff) / 255) ** 2.2;

/**
 * Using simplified approximation only - precision not needed for this use case.
 *
 * @internal
 */
export const __fromLinear = (x: number, shift = 0) =>
	(clamp01(x) ** G * 255 + 0.5) << shift;
