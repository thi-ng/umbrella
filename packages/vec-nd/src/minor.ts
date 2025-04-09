import type { VecOpRoV } from "@thi.ng/vec-api";

const abs = Math.abs;

/**
 * Returns index of minor component/axis in given nD vector, i.e. where
 * `|v[i]|` is the smallest.
 */
export const minor: VecOpRoV<number> = (a) => {
  let id = -1, min = 1 / 0;
  for (let i = 0, n = a.length;i < n; i++) {
    const x = abs(a[i]);
    if (x < min) {
      min = x;
      id = i;
    }
  }
  return id;
};