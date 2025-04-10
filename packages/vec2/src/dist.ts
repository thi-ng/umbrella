// SPDX-License-Identifier: Apache-2.0
import type { DistanceFn } from "@thi.ng/vec-api";

export const dist2: DistanceFn = (a, b) => Math.sqrt(distSq2(a, b));

/**
 * Computes the squared Eucledian distance between given vectors.
 */
export const distSq2: DistanceFn = (a,b) => {
	let t,s=0;t=a[0]-b[0];s+=t*t;t=a[1]-b[1];s+=t*t;return s;
};
