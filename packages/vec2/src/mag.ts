// SPDX-License-Identifier: Apache-2.0
import type { VecOpRoV } from "@thi.ng/vec-api";

export const mag2: VecOpRoV<number> = (v) => Math.sqrt(magSq2(v));

/**
 * Computes the squared magnitude of given 2D vector
 */
export const magSq2: VecOpRoV<number> = (a) => a[0] * a[0] + a[1] * a[1];
