// SPDX-License-Identifier: Apache-2.0
import type { ReadonlyVec, Vec } from "@thi.ng/vec-api";
import { maddN2 } from "./maddn.js";

/**
 * Calculates the nD point laying on ray at given distance. `rayDir` MUST be
 * normalized.
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
