import type { VecOpRoV } from "@thi.ng/vec-api";

const abs = Math.abs;

/**
 * Returns index of major component/axis in `v`, i.e. where `|v[i]|` is the
 * largest.
 */
export const major: VecOpRoV<number> = (a) => {
  let id = -1, max = -1 / 0;
  for (let i = 0, n = a.length;i < n; i++) {
    const x = abs(a[i]);
    if (x > max) {
      max = x;
      id = i;
    }
  }
  return id;
};