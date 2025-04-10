import type { VecOpRoVV } from "@thi.ng/vec-api";

/**
 * Computes dot product of given 3D vectors.
 */
export const dot3: VecOpRoVV<number> = (a, b) =>
	a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
