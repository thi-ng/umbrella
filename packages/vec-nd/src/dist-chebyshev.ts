import type { VecOpRoVV } from "@thi.ng/vec-api";

/**
 * Computes the Chebyshev distance between given vectors.
 * Reference: https://en.wikipedia.org/wiki/Chebyshev_distance
 */
export const distChebyshev: VecOpRoVV<number> = (a, b) => {
  let max = 0;
  for (let i = a.length;i-- > 0; )
    max = Math.max(max, Math.abs(a[i] - b[i]));
  return max;
};