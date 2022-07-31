import type { ReadonlyVec, Vec } from "./api.js";
import { maddN, maddN2, maddN3 } from "./maddn.js";

/**
 * Calculates the nD point laying on ray at given distance. `rayDir` MUST be
 * normalized.
 *
 * @param out -
 * @param rayOrigin -
 * @param rayDir -
 * @param dist -
 */
export const pointOnRay = (
	out: Vec | null,
	rayOrigin: ReadonlyVec,
	rayDir: ReadonlyVec,
	dist: number
) => maddN(out, rayDir, dist, rayOrigin);

/**
 * 2D version of {@link pointOnRay}.
 *
 * @param out -
 * @param rayOrigin -
 * @param rayDir -
 * @param dist -
 */
export const pointOnRay2 = (
	out: Vec | null,
	rayOrigin: ReadonlyVec,
	rayDir: ReadonlyVec,
	dist: number
) => maddN2(out, rayDir, dist, rayOrigin);

/**
 * 3D version of {@link pointOnRay}.
 *
 * @param out -
 * @param rayOrigin -
 * @param rayDir -
 * @param dist -
 */
export const pointOnRay3 = (
	out: Vec | null,
	rayOrigin: ReadonlyVec,
	rayDir: ReadonlyVec,
	dist: number
) => maddN3(out, rayDir, dist, rayOrigin);
