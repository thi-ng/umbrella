// SPDX-License-Identifier: Apache-2.0
import type { VecOpRoV } from "@thi.ng/vec-api";

export const mag3: VecOpRoV<number> = (v) => Math.sqrt(magSq3(v));

/**
 * Computes the squared magnitude of given 3D vector
 */
export const magSq3: VecOpRoV<number> = (a) =>
	a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
